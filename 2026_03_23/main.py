import os
from typing import List


# 2) Stworzenie klasy Course
class Course:
    def __init__(self, name: str):
        self.name: str = name


# 2) Stworzenie klasy Student z odpowiednim typowaniem
class Student:
    def __init__(self, student_id: int, first_name: str, last_name: str, age: int):
        self.student_id: int = student_id
        self.first_name: str = first_name
        self.last_name: str = last_name
        self.age: int = age
        # 3) Zmapowanie danych - lista kursów przypisana do studenta
        self.courses: List[Course] = []

    def add_course(self, course: Course) -> None:
        self.courses.append(course)


def main():
    students_map = {}

    # 1a) Import danych o studentach
    try:
        with open("students.txt", "r", encoding="utf-8") as f:
            for line in f:
                if line.strip():

                    parts = line.split(',')
                    if len(parts) >= 4:
                        s_id = int(parts[0].strip())
                        f_name = parts[1].strip()
                        l_name = parts[2].strip()
                        age = int(parts[3].strip())
                        students_map[s_id] = Student(s_id, f_name, l_name, age)
    except FileNotFoundError:
        print("Błąd: Nie znaleziono pliku 'students.txt'.")
        return

    # 1b) Import danych o kursach
    try:
        with open("courses.txt", "r", encoding="utf-8") as f:
            for line in f:
                if line.strip():

                    parts = line.split(',')
                    if len(parts) >= 2:
                        s_id = int(parts[0].strip())
                        c_name = parts[1].strip()
                        if s_id in students_map:
                            students_map[s_id].add_course(Course(c_name))
    except FileNotFoundError:
        print("Błąd: Nie znaleziono pliku 'courses.txt'.")
        return

    # Przetwarzanie zebranych danych
    for student in students_map.values():
        course_names = [course.name for course in student.courses]

        # 4) Wypisanie danych na ekran w czytelnej formie
        courses_str = ", ".join(course_names)
        print(f"{student.first_name} {student.last_name} ({student.age} lat): {courses_str}")

        # 5) Utworzenie plików tekstowych imie_nazwisko.txt dla każdego studenta
        filename = f"{student.first_name.lower()}_{student.last_name.lower()}.txt"

        with open(filename, "w", encoding="utf-8") as file:
            file.write("Kursy:\n")
            # Formatowanie listy kursów z przecinkami na końcu (poza ostatnim elementem)
            for i, c_name in enumerate(course_names):
                if i < len(course_names) - 1:
                    file.write(f"- {c_name},\n")
                else:
                    file.write(f"- {c_name}\n")


if __name__ == "__main__":
    main()