import json

import numpy
import pandas as pd
from os import path
from numpy import isnan
from numpyencoder import NumpyEncoder

per_page = 100


def form_response(frame: pd.DataFrame, page=1, keep_index=True, replace_nan=False):
    pagination = {
        "page": page,
        "per_page": per_page,
    }
    _keep_index = keep_index if keep_index != None else True

    keys = list(map(lambda x: { 'name': x }, frame.columns))
    first_element_index = (pagination['page'] - 1) * pagination['per_page']
    last_element_index = first_element_index + pagination['per_page']

    values = frame.to_numpy().tolist()

    values_without_nan = []
    if replace_nan:
        for row in values:
            new_row = []
            values_without_nan.append(new_row)
            for cell in row:
                is_nan = pd.isna(cell)
                new_row.append(cell if not is_nan else '')
    else:
        values_without_nan = values

    truncated_values = values_without_nan[first_element_index:last_element_index]

    value = {
        "data": {
            "keys": keys,
            "values": truncated_values
        },
        "pagination": {
            **pagination,
            "total_items": frame.shape[0]
        },
        "original_values": values_without_nan
    }

    return value


def read_file(file, keep_index=True):
    mode = None
    extension = path.splitext(file.name)[1]
    mode = 'csv' if extension == '.csv' else 'excel'
    file_content = pd.read_csv(file) if mode == 'csv' else pd.read_excel(file)
    file_content.insert(0, 'id', file_content.index)
    return form_response(file_content, keep_index=keep_index, replace_nan=True)

def get_data(_df, page=1):
    return form_response(pd.DataFrame(data=_df['data']['values'], columns=list(map(lambda x: x['name'], _df['data']['keys']))), page=page)
