from functools import reduce
from enum import Enum
import re


class Actions(Enum):
    DIVIDE = '/'
    MULTIPLE = '*'
    SUBTRACT = '-'
    ADD = '+'

    @classmethod
    def contains(cls, key):
        for item in cls.__members__.values():
            if item.value == key:
                return True

        return False

    @classmethod
    def get_action_order(cls, action):
        # print(Actions.__members__)
        order = 0
        for member in Actions:
            if member.value == action:
                return order

            order += 1

    @classmethod
    def perform(cls, action, a, b):
        if action == Actions.ADD.value:
            return a + b
        elif action == Actions.SUBTRACT.value:
            return a - b
        elif action == Actions.MULTIPLE.value:
            return a * b
        elif action == Actions.DIVIDE.value:
            return a / b
        else:
            return a + b

variables = {}


def get_variable(var):
    if var in variables:
        return variables[var]
    else:
        print('Unknown variable')
        return None

def set_variable(var, value):
    variables[var] = value
    # variables.setdefault(var, value)


def char_is_variable(var):
    match = re.match(r'^[A-Za-z]+$', var)
    return bool(match)

def char_is_digit(var):
    if var == '.':
        return True
    try:
        float(var)
    except ValueError:
        return False
    else:
        return True


def char_is_operand(var):
    return char_is_variable(var) or char_is_digit(var)

user_input = ''


def get_char_type(char):
    if char_is_operand(char):
        return 'operand'
    if char == '(' or char == ')':
        return 'parenthesis'
    if Actions.contains(char):
        return 'action'


def parse_chars(chars):
    prev_char_type = get_char_type(chars[0])
    current_element = ''
    result = []
    opening_brackets_count = 0
    closing_brackets_count = 0

    def append_current_element_to_result(char = ''):
        nonlocal prev_char_type
        nonlocal current_element
        current_element_has_alphas = current_element_has_digits = False
        prev_char_type = current_char_type
        closing_brackets_count = 0


        current_element_has_alphas = bool(re.search(r'[A-Za-z]', current_element))
        current_element_has_digits = bool(re.search(r'[0-9]', current_element))

        if current_element_has_alphas and current_element_has_digits:
            raise ValueError

        if current_element_has_digits:
            try:
                float(current_element)
            except ValueError:
                raise ValueError
            result.append(current_element)
            current_element = char
        elif len(current_element) and Actions.contains(current_element[0]):
            if current_element[0] == Actions.SUBTRACT.value:
                if len(current_element) % 2 == 0:
                    current_element = '+'
                else:
                    current_element = '-'
            if len(current_element) > 1 and (current_element[0] == Actions.DIVIDE.value or current_element[0] == Actions.MULTIPLE.value):
                raise ValueError

            result.append(current_element[0])
            current_element = char
        else:
            result.append(current_element)
            current_element = char


    for index, char in enumerate(chars):
        if char == ' ':
            continue

        if char == '(':
            opening_brackets_count += 1
        elif char == ')':
            closing_brackets_count += 1

        is_last = index == len(chars) - 1
        current_char_type = get_char_type(char)

        if current_char_type != prev_char_type:
            append_current_element_to_result(char=char)
        else:
            current_element += char

    if len(current_element):
        append_current_element_to_result()

    if opening_brackets_count != closing_brackets_count:
        raise ValueError

    return result


def get_postfix(value):
    stack = []
    result = []
    _value = parse_chars(value)

    for char in _value:
        top_of_stack = None
        if len(stack):
            top_of_stack = stack[-1]

        if char_is_operand(char):
            result.append(char)
        elif Actions.contains(char):
            current_action_order = Actions.get_action_order(char)
            if not len(stack) or top_of_stack == '(':
                stack.append(char)
            elif Actions.contains(top_of_stack):
                if current_action_order < Actions.get_action_order(top_of_stack):
                    stack.append(char)
                elif current_action_order >= Actions.get_action_order(top_of_stack):
                    while len(stack):
                        operator = stack.pop()
                        result.append(operator)
                        if not len(stack):
                            stack.append(char)
                            break
                        last_element_in_stack = stack[-1]
                        if (Actions.contains(last_element_in_stack) and Actions.get_action_order(last_element_in_stack) > current_action_order) or last_element_in_stack == '(':
                            stack.append(char)
                            break
        elif char == '(':
            stack.append(char)
        elif char == ')':
            while len(stack):
                operator = stack.pop()
                result.append(operator)
                if not len(stack):
                    break
                last_element_in_stack = stack[-1]
                if last_element_in_stack == '(':
                    stack.pop()
                    break

    if len(stack):
        while len(stack):
            result.append(stack.pop())

    return result


def calculate(chars):
    acc = 0
    result_stack = []
    for element in chars:
        if char_is_operand(element):
            if char_is_digit(element):
                result_stack.append(element)
            else:
                var = get_variable(element)
                result_stack.append(var)
        else:
            b = result_stack.pop()
            a = result_stack.pop()
            _result = Actions.perform(action=element, a=float(a), b=float(b))
            result_stack.append(_result)

    return result_stack[-1]

while True:
    user_input = input()
    should_continue = False
    if not len(user_input):
        continue
    if (user_input[0] == '/'):
        if user_input == '/exit':
            print('bye')
            break
        elif user_input == '/help':
            print('The program calculates the sum of numbers')
            continue
        else:
            print('Unknown command')
            continue

    if not user_input:
        continue

    assignment_match = re.match(r'(.+)=(.+)', user_input)
    if assignment_match:
        expression = assignment_match[1].strip()
        assignment = assignment_match[2].strip()
        if not char_is_variable(expression):
            print("Invalid identifier")

        _char_is_variable = char_is_variable(assignment)
        _char_is_digit = char_is_digit(assignment)
        if not _char_is_variable and not _char_is_digit:
            print("Invalid assignment")

        if _char_is_digit:
            set_variable(expression, assignment)
        else:
            assigned_value = get_variable(assignment)
            if assigned_value is not None:
                set_variable(expression, assigned_value)

    elif char_is_variable(user_input):
        value = get_variable(user_input)
        if value:
            print(value)
    else:
        try:
            user_input_postfix = get_postfix(user_input)
            result = calculate(user_input_postfix)
            try:
                print(round(result) if float(result).is_integer() else result)
            except BaseException:
                print(result)
        except BaseException:
            print('Invalid expression')

exit()