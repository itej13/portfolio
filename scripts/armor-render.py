"""Render the portfolio suit in an isolated Blender process; never save the source.

Blender --background --factory-startup --disable-autoexec --python scripts/armor-render.py -- --preview
Blender --background --factory-startup --disable-autoexec --python scripts/armor-render.py -- --frames
"""
from pathlib import Path
import argparse
import json
import hashlib
import shutil
import math
import sys

import bpy
from mathutils import Matrix, Vector

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path('/Users/tejasdas/Developer/Blender/Iron Man/cadnav-source/cadnav.com_model/Model_D0901A13/IronMan.obj')
OUT = ROOT / 'public/armor'
RAW = Path('/private/tmp/portfolio-cadnav-renders')
parser = argparse.ArgumentParser()
parser.add_argument('--preview', action='store_true')
parser.add_argument('--frames', action='store_true')
parser.add_argument('--keyframes', action='store_true')
parser.add_argument('--poster', action='store_true')
parser.add_argument('--save-scene', type=Path)
parser.add_argument('--start', type=int, default=0)
parser.add_argument('--end', type=int, default=95)
args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])
OUT.mkdir(parents=True, exist_ok=True)
RAW.mkdir(parents=True, exist_ok=True)
# The source contains 27 mesh rings exported from rig helpers. Their audited
# contiguous face range is excluded; every armor face and custom normal remains.
source_bytes = SOURCE.read_bytes()
assert hashlib.sha256(source_bytes).hexdigest() == 'f4e70fecbcccbd19c6a77505b7bee9bbd70199130c2ff591cee444231f9fbd02', 'Re-audit changed source.'
source_text = source_bytes.decode()
source_faces = 0
prepared = []
active_material = ''
for line in source_text.splitlines(keepends=True):
    if line.startswith('g ' ) or line.strip() == 'g':
        continue
    if line.startswith('usemtl '):
        active_material = line
    if line.startswith('f '):
        source_faces += 1
        if 140244 <= source_faces <= 149315:
            continue
    if line.startswith('f ') and source_faces == 135929:
        prepared.append('usemtl yellow\n')  # Audited filled reactor disc.
    prepared.append(line)
    if line.startswith('f ') and source_faces == 136036:
        prepared.append(active_material)
assert source_faces == 149827, 'Source changed; re-audit helper exclusion before rendering.'
clean_source = RAW / 'IronMan.obj'
clean_source.write_text(''.join(prepared))
shutil.copyfile(SOURCE.with_suffix('.mtl'), RAW / 'IronMan.mtl')
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.wm.obj_import(filepath=str(clean_source), forward_axis='NEGATIVE_Z', up_axis='Y')
scene = bpy.context.scene
suit = next(obj for obj in scene.objects if obj.type == 'MESH')
assert len(suit.data.polygons) == 149827 - 9072
assert suit.data.has_custom_normals
points = [suit.matrix_world @ v.co for v in suit.data.vertices]
low = Vector(tuple(min(v[i] for v in points) for i in range(3)))
high = Vector(tuple(max(v[i] for v in points) for i in range(3)))
center = Vector(((low.x + high.x) / 2, (low.y + high.y) / 2, low.z))
normalization = Matrix.Scale(2 / (high.z - low.z), 4) @ Matrix.Translation(-center)
suit.data.transform(normalization @ suit.matrix_world)
suit.matrix_world = Matrix.Identity(4)
bpy.context.view_layer.objects.active = suit
suit.select_set(True)
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.mesh.separate(type='LOOSE')
bpy.ops.object.mode_set(mode='OBJECT')
meshes = [obj for obj in scene.objects if obj.type == 'MESH']
assert len(meshes) == 863
assert sum(len(obj.data.polygons) for obj in meshes) == 140755
bpy.context.view_layer.update()



def material(name, color, metallic=0.7, roughness=0.24, emission=0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value = (*color, 1)
    bsdf.inputs['Metallic'].default_value = metallic
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['Coat Weight'].default_value = 0.3 if emission == 0 else 0
    bsdf.inputs['Coat Roughness'].default_value = 0.18
    if emission:
        bsdf.inputs['Emission Color'].default_value = (*color, 1)
        bsdf.inputs['Emission Strength'].default_value = emission
    return mat


red = material('Portfolio | oxblood enamel', (0.24, 0.005, 0.01), 0.78, 0.27)
gold = material('Portfolio | champagne gold titanium', (0.54, 0.29, 0.065), 0.86, 0.28)
dark = material('Portfolio | graphite mechanical seams', (0.017, 0.022, 0.027), 0.78, 0.31)
silver = material('Portfolio | polished titanium', (0.27, 0.32, 0.37), 0.92, 0.2)
light = material('Portfolio | arc white cyan', (0.53, 0.92, 1.0), 0.05, 0.19, 9)
# Preserve the supplied face material assignments, replacing only the shaders.
palette = {'red': red, 'gold': gold, 'darksilver': dark, 'silver': silver,
           'black': dark, 'lambert1': dark, 'yellow': light, '14_-_Default': dark}
for index, obj in enumerate(meshes):
    for slot in obj.material_slots:
        source_name = slot.material.name.split(':')[-1].split('.')[0]
        assert source_name in palette, source_name
        slot.material = palette[source_name]
    obj.name = f'CadNav armor {index + 1:03d}'

camera_data = bpy.data.cameras.new('Portfolio portrait camera')
camera = bpy.data.objects.new('Portfolio portrait camera', camera_data)
scene.collection.objects.link(camera)
scene.camera = camera
camera_data.type = 'ORTHO'
camera_data.lens = 70


def area(name, location, power, color, width, height, target=(0, 0, 1.2)):
    data = bpy.data.lights.new(name, 'AREA')
    data.energy = power * .42
    data.color = color
    data.shape = 'RECTANGLE'
    data.size = width
    data.size_y = height
    obj = bpy.data.objects.new(name, data)
    scene.collection.objects.link(obj)
    obj.location = location
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat('-Z', 'Y').to_euler()
    return obj


area('Key | large warm softbox', (-2.8, -4.0, 4.5), 1050, (1, .89, .76), 3.0, 3.5)
area('Fill | cool vertical strip', (2.8, -2.0, 2.3), 750, (.67, .83, 1), .8, 3.6)
area('Rim | cyan right edge', (1.5, 1.0, 2.5), 900, (.29, .7, 1), 1.0, 2.5)
area('Rim | warm left edge', (-1.6, .7, 2.3), 1000, (1, .53, .28), .7, 2.5)
area('Top | clean white crown', (0, -.2, 4), 480, (1, 1, 1), 2, 1)
area('Face | frontal bounce', (-.5, -3, 1.8), 95, (.75, .87, 1), 2, 2)
world = bpy.data.worlds.new('Portfolio studio ambience')
world.use_nodes = True
world.node_tree.nodes['Background'].inputs[0].default_value = (.12, .15, .2, 1)
world.node_tree.nodes['Background'].inputs[1].default_value = .3
scene.world = world
scene.render.engine = 'BLENDER_EEVEE'
scene.eevee.taa_render_samples = 48
scene.render.film_transparent = True
scene.render.resolution_x = 900
scene.render.resolution_y = 1100
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
scene.render.image_settings.color_depth = '8'
scene.render.image_settings.compression = 25
scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = 'AgX - Medium High Contrast'
scene.view_settings.exposure = -.5

original = {obj.name: obj.matrix_world.copy() for obj in meshes}
centers = {obj.name: sum((obj.matrix_world @ Vector(p) for p in obj.bound_box), Vector()) / 8 for obj in meshes}
source_centers = {name: normalization.inverted() @ center for name, center in centers.items()}
shoulders = {1: normalization @ Vector((26.446579, 3.647027, 196.929092)), -1: normalization @ Vector((-26.406830, 4.085775, 197.394974))}


def smooth(value):
    t = max(0, min(1, value))
    return t * t * (3 - 2 * t)


def around(pivot, angle, axis):
    return Matrix.Translation(pivot) @ Matrix.Rotation(angle, 4, axis) @ Matrix.Translation(-pivot)


def pose(progress):
    pull = smooth(progress / .43)
    inspect = smooth((progress - .32) / .32)
    assemble = smooth((progress - .73) / .27)
    spread = math.sin(math.pi * smooth((progress - .32) / .58))
    rotation = Matrix.Rotation(math.radians(64 * inspect - 57 * assemble), 4, 'Z')
    for obj in meshes:
        center = centers[obj.name]
        sign = 1 if center.x >= 0 else -1
        offset = Vector((0, 0, 0))
        articulation = Matrix.Identity(4)
        native = source_centers[obj.name]
        if abs(native.x) > 27 and native.z > 175:
            pivot = shoulders[sign]
            articulation = around(pivot, math.radians(sign * (73 - 17 * spread)), 'Y')
            offset.x = sign * .085
        elif center.z > 1.74:
            offset.z = .1
        elif center.z > 1.25:
            offset.y = -.12 if center.y < 0 else .08
            offset.x = sign * .025
        elif center.z > .92:
            offset.y = -.09 if center.y < 0 else .06
        else:
            offset.x = sign * .035
            offset.y = -.025 if center.y < 0 else .025
        obj.matrix_world = rotation @ Matrix.Translation(offset * spread) @ articulation @ original[obj.name]
    target = Vector((0, 0, 1.39 - .36 * pull))
    azimuth = math.radians(18)
    camera.location = target + Vector((math.sin(azimuth) * 6, -math.cos(azimuth) * 6, .34 - .12 * pull))
    camera.rotation_euler = (target - camera.location).to_track_quat('-Z', 'Y').to_euler()
    camera_data.ortho_scale = 1.45 + .86 * pull
    bpy.context.view_layer.update()


def render(index, path):
    pose(index / 95)
    scene.render.filepath = str(path)
    bpy.ops.render.render(write_still=True)
    print(f'ARMOR_FRAME {index:03d} {path}', flush=True)


assert smooth(-1) == 0 and smooth(2) == 1 and smooth(.5) == .5
if args.poster:
    scene.render.resolution_x = 1440
    scene.render.resolution_y = 1760
    scene.eevee.taa_render_samples = 96
    render(0, RAW / 'poster.png')
elif args.keyframes:
    for index in (0, 57, 95):
        render(index, RAW / f'frame-{index:03d}.png')
elif args.frames:
    assert 0 <= args.start <= args.end <= 95
    for index in range(args.start, args.end + 1):
        render(index, RAW / f'frame-{index:03d}.png')
else:
    render(0, RAW / 'preview.png')

(OUT / 'sequence.json').write_text(json.dumps({
    'frameCount': 96, 'width': 900, 'height': 1100,
    'pattern': '/armor/frame-{index:03d}.webp', 'poster': '/armor/poster.webp',
    'source': 'Complete supplied CadNav IronMan.obj, with exported helper rings excluded.',
    'sourceSha256': hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
    'credit': 'Model: cadnav.com. Materials, lighting, posing, and animation: Tejas Das portfolio.',
}, indent=2) + '\n')

if args.save_scene:
    scene.frame_start, scene.frame_end = 1, 96
    scene.render.fps = 24
    for frame in [*range(1, 97, 4), 96]:
        scene.frame_set(frame)
        pose((frame - 1) / 95)
        for obj in [*meshes, camera]:
            obj.keyframe_insert(data_path='location', frame=frame)
            obj.keyframe_insert(data_path='rotation_euler', frame=frame)
        camera_data.keyframe_insert(data_path='ortho_scale', frame=frame)
    scene.frame_set(1)
    scene['source_geometry'] = 'Complete supplied CadNav suit; helper rings excluded; original source unchanged.'
    args.save_scene.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(args.save_scene), compress=True)
