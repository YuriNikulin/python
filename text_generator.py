import nltk
from dataclasses import dataclass
import re
from nltk.tokenize import word_tokenize, regexp_tokenize
from random import randrange
# nltk.download('punkt')

def word_has_punctuation_mark(word):
    return bool(re.search(r'\.|!|\?', word))

def start_getting_indexes_from_input(cb):
    tokens_index = 0
    while tokens_index != 'exit':
        try:
            tokens_index = input()
            if tokens_index == 'exit':
                continue
            tokens_index = int(tokens_index)
            cb(tokens_index)
        except (TypeError, ValueError):
            print('Type Error. Please input an integer.')
            continue
        except IndexError:
            print('Index Error. Please input an integer that is in the range of the corpus.')
            continue
        except BaseException:
            continue

def process_tokens(tokens):
    tokens_length = len(tokens)
    tokens_uniq_length = len(set(tokens))
    print(f'Corpus statistics\n'
          f'All tokens: {tokens_length}\n'
          f'Unique tokens: {tokens_uniq_length}\n')

    start_getting_indexes_from_input(lambda index: print(tokens[index]))


@dataclass
class Bigram:
    tail: str
    head: str


def generate_bigrams(tokens):
    bigrams: list[Bigram] = list()
    bigrams.append(Bigram(head=tokens[0], tail=tokens[1]))
    index = 1

    while index < len(tokens) - 1:
        bigrams.append(Bigram(head=tokens[index], tail=tokens[index + 1]))
        index += 1
    return bigrams

def generate_trigrams(tokens):
    bigrams: list[Bigram] = list()

    index = 0
    while index < len(tokens) - 2:
        head_first_part = tokens[index]
        head_second_part = tokens[index + 1]
        tail = tokens[index + 2]
        bigrams.append(Bigram(head=f'{head_first_part} {head_second_part}', tail=tail))
        index += 1

    return bigrams

def generate_markov_chain(bigrams: list[Bigram]):
    bigrams_dict = {}
    for bigram in bigrams:
        head_dict = bigrams_dict.setdefault(bigram.head, {})
        current_tail_count = head_dict.setdefault(bigram.tail, 0)
        head_dict[bigram.tail] += 1

    return bigrams_dict

    user_input = ''
    while user_input != 'exit':
        user_input = input()
        if user_input == 'exit':
            continue

        try:
            tails = bigrams_dict[user_input]
            sorted_tails = sorted(tails.items(), key=lambda item: item[1])
            print(f'Head: {user_input}')
            for [tail, count] in sorted_tails[:-7:-1]:
                print(f'Tail: {tail}\tCount: {count}')
        except KeyError:
            print('The requested word is not in the model. Please input another word.')
            continue


def sentence_consists_of_valid_trigrams(sentence, markov_chain):
    word_index = 2
    while word_index < len(sentence):
        tail = sentence[word_index]
        head = f'{sentence[word_index - 2]} {sentence[word_index - 1]}'
        if head not in markov_chain:
            return False

        if tail not in markov_chain[head]:
            return False

        word_index += 1

    return True


def generate_random_text(markov_chain, trigrams, sentences_count=10, minimal_sentence_length=5):
    keys = list(markov_chain.keys())
    sentences = []
    current_sentence_index = 0
    should_continue_outer_loop = False
    while current_sentence_index < sentences_count:
        random_index = randrange(0, len(markov_chain) - 1)
        head: str = keys[random_index]
        if word_has_punctuation_mark(head) or not head[0].isupper():
            continue

        current_sentence = []
        [first_head, second_head] = head.split()
        current_sentence.extend([first_head.capitalize(), second_head])
        current_word_index = 0
        while True:
            should_break = False
            if head not in markov_chain:
                should_continue_outer_loop = True
                break

            tails = markov_chain[head]
            sorted_tails = sorted(tails.items(), key=lambda item: item[1], reverse=True)
            most_probable_tail = sorted_tails[0][0]
            current_sentence.append(most_probable_tail)
            last_two_tokens = ' '.join(current_sentence).split()[-1:-3:-1]
            last_two_tokens.reverse()
            head = ' '.join(last_two_tokens)

            if len(current_sentence) >= minimal_sentence_length:
                if word_has_punctuation_mark(most_probable_tail):
                    break
            current_word_index += 1

        if should_continue_outer_loop:
            should_continue_outer_loop = False
            continue

        if not sentence_consists_of_valid_trigrams(current_sentence, markov_chain=markov_chain):
            continue
        sentences.append(current_sentence)
        current_sentence_index += 1

    for snt in sentences:
        print(' '.join(snt))
    return sentences

def main():
    # filename = input()
    filename = 'kaliber.txt'
    with open(filename, 'r', encoding="utf-8") as file:
        file_content = file.read()
        tokens = file_content.split()
        trigrams = generate_trigrams(tokens)
        markov_chain = generate_markov_chain(trigrams)
        random_text = generate_random_text(markov_chain, trigrams=trigrams)

if __name__ == '__main__':
    main()


