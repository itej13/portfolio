"""Render the portfolio suit in an isolated Blender process; never save the source.

Blender --background --factory-startup --disable-autoexec --python scripts/armor-render.py -- --preview
Blender --background --factory-startup --disable-autoexec --python scripts/armor-render.py -- --frames
"""
from pathlib import Path
import argparse
import json
import math
import sys

import bpy
from mathutils import Matrix, Vector

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path('/Users/tejasdas/Developer/Blender/Iron Man/cadnav-blender/reference-fit-v3/IronMan_editable.blend')
INVENTORY = SOURCE.parents[1] / 'control-audit/component-inventory.json'
OUT = ROOT / 'public/armor'
RAW = Path('/private/tmp/portfolio-armor-renders')
parser = argparse.ArgumentParser()
parser.add_argument('--preview', action='store_true')
parser.add_argument('--frames', action='store_true')
parser.add_argument('--keyframes', action='store_true')
parser.add_argument('--poster', action='store_true')
parser.add_argument('--start', type=int, default=0)
parser.add_argument('--end', type=int, default=95)
args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])
OUT.mkdir(parents=True, exist_ok=True)
RAW.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
scene = bpy.context.scene


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
inventory = {x['component_id']: x for x in json.loads(INVENTORY.read_text())['components']}
meshes = [obj for obj in scene.objects if obj.type == 'MESH']

for obj in meshes:
    obj.hide_render = False
    name = obj.name.lower()
    old = ' '.join(mat.name.lower() for mat in obj.data.materials if mat)
    mat = red
    cid = obj.get('source_component')
    if cid:
        source_mats = inventory[cid]['materials']
        if 'yellow' in source_mats:
            mat = light
        elif 'gold' in source_mats:
            mat = gold
        elif set(source_mats) <= {'darksilver', 'silver', 'black'}:
            mat = dark
    elif any(word in name for word in ['under-shell', 'bellows', 'articulation', 'inset floor', 'inner walls', 'socket', 'recess', 'rebate', 'neck']):
        mat = dark
    elif 'joint' in old or 'gaps' in old or 'dark' in old:
        mat = dark
    elif name.startswith('upper arm front') or name.startswith('thigh | front shield') or 'lateral long panel' in name:
        mat = gold
    elif 'reactor center' in name:
        mat = light
    elif 'reactor |' in name:
        mat = silver
    obj.data.materials.clear()
    obj.data.materials.append(mat)
    for polygon in obj.data.polygons:
        polygon.material_index = 0

# A narrow silver rim catches a clean highlight around the existing arc socket.
reactor = bpy.data.objects.get('Reactor center')
assert reactor is not None and len(meshes) > 200

for obj in list(scene.objects):
    if obj.type != 'MESH':
        bpy.data.objects.remove(obj, do_unlink=True)

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
scene.view_settings.exposure = -.3

original = {obj.name: obj.matrix_world.copy() for obj in meshes}
centers = {obj.name: sum((obj.matrix_world @ Vector(p) for p in obj.bound_box), Vector()) / 8 for obj in meshes}


def smooth(value):
    t = max(0, min(1, value))
    return t * t * (3 - 2 * t)


def pose(progress):
    pull = smooth(progress / .43)
    inspect = smooth((progress - .32) / .32)
    assemble = smooth((progress - .73) / .27)
    spread = math.sin(math.pi * smooth((progress - .32) / .58)) * 2.5
    angle = math.radians(70 * inspect - 61 * assemble)
    rotation = Matrix.Rotation(angle, 4, 'Z')
    for obj in meshes:
        name = obj.name.lower()
        center = centers[obj.name]
        offset = Vector((0, 0, 0))
        sign = 1 if center.x >= 0 else -1
        if 'helmet' in name:
            offset.z = .038
        elif 'chest' in name or 'reactor' in name:
            offset.y = -.058
        elif 'shoulder' in name or 'upper arm' in name:
            offset.x = sign * .065
        elif 'forearm' in name or 'hand' in name:
            offset.x = sign * .028
        elif 'abdomen' in name:
            offset.y = -.045
        elif 'thigh' in name or 'shin' in name or 'calf' in name or 'knee' in name:
            offset.x = sign * .025
            offset.y = -.014 if center.y < 0 else .014
        obj.matrix_world = rotation @ Matrix.Translation(offset * spread) @ original[obj.name]
    target = Vector((0, 0, 1.37 - .35 * pull))
    azimuth = math.radians(23)
    camera.location = target + Vector((math.sin(azimuth) * 6, -math.cos(azimuth) * 6, .42 - .12 * pull))
    camera.rotation_euler = (target - camera.location).to_track_quat('-Z', 'Y').to_euler()
    camera_data.ortho_scale = 1.46 + .8 * pull
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
    'source': 'Existing local reference-fit-v3 suit; CadNav-derived helmet, forearms, and hands.',
    'credit': 'Base model components: cadnav.com. Local reconstruction, materials, lighting, and animation: Tejas Das portfolio.',
}, indent=2) + '\n')
