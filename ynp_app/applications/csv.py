import pandas as pd
from os import path


def form_response(frame: pd.DataFrame):
    keys = list(map(lambda x: { 'name': x }, frame.keys()))
    return {
        "keys": keys
    }


def read_file(file):
    mode = None
    extension = path.splitext(file.name)[1]
    mode = 'csv' if extension == '.csv' else 'excel'
    file_content = pd.read_csv(file) if mode == 'csv' else pd.read_excel(file)
    # file_content = file_content.to_json()
    # head = file_content.head().to_json()
    # print(file_content)
    return form_response(file_content)