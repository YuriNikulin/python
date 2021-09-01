import sys, os, shutil
from ynp.settings import BASE_DIR

def collect_images():
    img_extensions = ['.svg', '.jpg', '.jpeg', '.png']
    STATIC_DIRECTORY = BASE_DIR / 'static'
    counter_of_new_files = 0
    counter_of_all_files = 0
    for root, dirs, files in os.walk('frontend/src'):
        for img in [f for f in files if os.path.splitext(f)[1] in img_extensions]:
            img_destination_path = os.sep.join(os.path.normpath(root).split(os.sep)[2:])
            img_destination_path = os.path.realpath(os.path.join(STATIC_DIRECTORY, img_destination_path))
            img_path = os.path.realpath(os.path.join(root, img))
            new_img_name = os.path.join(img_destination_path, img)

            if not os.path.exists(new_img_name):
                counter_of_new_files += 1
                print(f'{img} was copied to {new_img_name}')

            if not os.path.exists(img_destination_path):
                os.makedirs(img_destination_path)
            counter_of_all_files += 1
            shutil.copy(img_path, img_destination_path)
    
    if counter_of_all_files == 1:
        print(f'{counter_of_all_files} file was copied in total')
    elif counter_of_all_files > 1:
        print(f'{counter_of_all_files} files total were copied in total')
    else:
        print('No files were copied.')

    if counter_of_new_files == 1:
        print(f'({counter_of_new_files} new file)')
    elif counter_of_new_files > 1:
        print(f'({counter_of_new_files} new files).')
        


commands = {
    'collect_images': {
        "handler": collect_images
    }
}


try:
    command = sys.argv[1]
    handler = commands[command]["handler"]
    handler()
except KeyError:
    print(f'Error: there is no such command ("{command}").\n\
    Available commands are: {", ".join(commands.keys())}.')
