import pandas as pd
from os import path
import re

filepath = input('Input file name\n')
# filepath = 'data_one_csv.csv'
[filename, file_extension] = path.splitext(filepath)
df = None
if file_extension == '.xlsx':
    df = pd.read_excel(f'{filepath}', sheet_name="Vehicles", dtype=str)
    df.to_csv(f'{filename}.csv')
    lines_count = df.shape[0]
    if lines_count > 1:
        print(f'{lines_count} lines were added to {filename}.csv')
    else:
        print(f'{lines_count} line was added to {filename}.csv')
elif file_extension == '.csv':
    df = pd.read_csv(filepath, dtype=str)


header = df.keys()
result_lines = []
total_fixed_count = 0
for line in df.values:
    new_line = []
    for cell in line:
        extracted_number = re.search(r'[0-9]+', cell)
        if not extracted_number:
            new_line.append('NaN')
        else:
            extracted_number = extracted_number[0]
            if len(extracted_number) != len(cell):
                total_fixed_count += 1
            new_line.append(extracted_number)

    result_lines.append(new_line)

new_df = pd.DataFrame(result_lines, columns=header)
new_filepath = f'{filename}[CHECKED].csv'
new_df.to_csv(f'./{new_filepath}', index=False)

if total_fixed_count > 0:
    if total_fixed_count > 1:
        print(f'{total_fixed_count} cells were corrected in {new_filepath}')
    else:
        print(f'{total_fixed_count} cell was corrected in {new_filepath}')
