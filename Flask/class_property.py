# -*- coding: utf-8 -*-

import datetime


class Student:
    """
    这里演示了class中，如何利用属性的一些额外用法
    """
    def __init__(self, name, birthday):
        self.name = name
        self.birthday = birthday

    @property
    def age(self):
        return datetime.date.today().year - self.birthday.year

    @age.setter
    def age(self, value):
        raise AttributeError('不能给 age 赋值')

    @age.deleter
    def age(self):
        raise AttributeError('不能删除 age 属性')

    def __repr__(self):
        return "控制台显示, 输入Student"

    def __str__(self):
        return "用于打印，执行print(s)"


def main_age():
    s = Student('MaiXiaochai', datetime.date(2019, 6, 12))
    print(s.birthday)
    """Out: 2019-06-12"""

    print(s.age)
    """Out: 0"""

    s.age = 18
    """
    Out:
    File "E:/gitcode/FrontEnd/Flask/class_property.py", line 17, in age
    raise AttributeError('不能给 age 赋值')
    AttributeError('不能给 age 赋值')
    """

    del(s.age)
    """
    Out:
    File "E:/gitcode/FrontEnd/Flask/class_property.py", line 21, in age
    raise AttributeError('不能删除 age 属性')
    AttributeError: 不能删除 age 属性
    """


if __name__ == '__main__':
    main_age()
