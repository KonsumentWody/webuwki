def main():
    with open('sygnaly.txt', 'r', encoding='utf-8') as f:
        slowa = [linia.strip() for linia in f.readlines()]

    przeslanie = ""


    for i in range(39, len(slowa), 40):
        slowo = slowa[i]

        przeslanie += slowo[9]

    print("Zadanie 4.1:")
    print(przeslanie)

    with open('wyniki4.txt', 'a', encoding='utf-8') as f_out:
        f_out.write("4.1\n")
        f_out.write(przeslanie + "\n\n")


if __name__ == '__main__':
    main()