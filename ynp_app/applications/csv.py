import pandas as pd
from os import path
import re
from datetime import datetime

per_page = 100
id_col_name = 'Номер'


def df_col_contains(tested_value, search_value):
    search = re.search(rf"{str(search_value).lower()}", f"{str(tested_value).lower()}")
    return bool(search)

def df_col_equals(tested_value, search_value):
    try:
        return str(tested_value) == str(search_value)
    except Exception:
        return False


def generate_df_from_json(value):
    return pd.DataFrame(
        data=value['data']['values'],\
        columns=list(map(lambda x: x['name'], value['data']['keys'])),
    )


def form_response(frame: pd.DataFrame, page=1, keep_index=True, replace_nan=False, columns=[]):
    pagination = {
        "page": page,
        "per_page": per_page,
    }
    _keep_index = keep_index if keep_index != None else True

    keys = list(map(lambda x: {
        'name': x.replace('№', 'Номер'),
        'isEditable': x != id_col_name,
        'isMandatory': x == id_col_name,
        'show': True
    }, frame.columns))
    first_element_index = (pagination['page'] - 1) * pagination['per_page']
    last_element_index = first_element_index + pagination['per_page']

    values = frame.fillna(value='')
    if columns:
        df_keys = values.keys()
        excluded_columns = []
        for _key in df_keys:
            if _key not in columns:
                excluded_columns.append(_key)
                user_key = next(x for x in keys if x['name'] == _key)
                if user_key:
                    user_key['show'] = False

        user_values = values
        user_values.drop(columns=excluded_columns, inplace=True)
        user_values_list = user_values.to_numpy().tolist()
        values_list = values.to_numpy().tolist()
    else:
        values_list = values.to_numpy().tolist()
        user_values_list = values_list

    truncated_values = user_values_list[first_element_index:last_element_index]

    value = {
        "data": {
            "keys": keys,
            "values": truncated_values
        },
        "pagination": {
            **pagination,
            "total_items": frame.shape[0]
        },
        "original_values": values_list
    }

    return value


def read_file(file, keep_index=True):
    mode = None
    extension = path.splitext(file.name)[1]
    mode = 'csv' if extension == '.csv' else 'excel'
    file_content = pd.read_csv(file) if mode == 'csv' else pd.read_excel(file)
    file_content.insert(0, id_col_name, file_content.index)
    return form_response(file_content, keep_index=keep_index, replace_nan=True)


def get_data(_df, page=1, sort={}, filters=[], columns=None, return_df=False):
    df = generate_df_from_json(_df)
    sort_key = sort.get('key')

    if len(filters):
        for f in filters:
            key = f['key']
            value = f['value']
            if f['strict']:
                df = df[df[key].apply(lambda x: df_col_equals(x, value))]
            else:
                df = df[df[key].apply(lambda x: df_col_contains(x, value))]

    if sort_key:
        ascending = sort.get('value') == 'asc'
        df.sort_values(by=sort_key, ascending=ascending, inplace=True)

    if not return_df:
        return form_response(df, page=page, columns=columns)
    else:
        if columns:
            df_keys = df.keys()
            excluded_columns = [x for x in df_keys if x not in columns]
            df.drop(columns=excluded_columns, inplace=True)
        return df

def edit(item_id, col_index, new_value, user_document):
    df = generate_df_from_json(user_document)
    key = df.keys()[col_index]
    _df = df.at[item_id, key] = new_value

    return form_response(df, replace_nan=True)


def remove(item_id, user_document):
    df = generate_df_from_json(user_document)
    df = df[df[id_col_name] != item_id]
    return form_response(df)


def add(item_id, user_document):
    df = generate_df_from_json(user_document)

    new_row_index = df[df[id_col_name] == item_id].index[0] + 1
    new_row_value = list(map(lambda x: '', range(0, len(df.keys()))))
    df1 = df[0:new_row_index]
    df2 = df[new_row_index:]
    df1.loc[new_row_index] = new_row_value
    df_result = pd.concat([df1, df2])
    new_indexes = [*range(df_result.shape[0])]
    df_result.index = new_indexes
    df_result[id_col_name] = new_indexes
    return {
        'data': form_response(df_result),
        'new_item_id': new_row_index
    }


def add_column(column, user_document):
    df = generate_df_from_json(user_document)
    df.insert(len(df.keys()), column, value='')
    return form_response(df)


def create_document():
    df = pd.DataFrame(data=[[0]], columns=[id_col_name])
    return form_response(df)


def export(user_document, format='csv', filters=[], sort={}, columns=None):
    df = get_data(user_document, filters=filters, sort=sort, columns=columns, return_df=True)
    result = None
    ts = datetime.now().strftime("%d_%m_%Y_%H_%M")

    if format == 'csv':
        filename = f'{ts}.csv'
        result = df.to_csv(index=False)
        f = open(filename, 'w')
        f.write(result)
        f.close()
    else:
        filename = f'{ts}.xlsx'
        df.to_excel(excel_writer=filename, index=False)
    return filename
