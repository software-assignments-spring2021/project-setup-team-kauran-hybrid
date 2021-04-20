# -*- coding: utf-8 -*-
"""
Created on Sun Apr 18 17:12:27 2021

"""
import pandas as pd
from random import randrange

fall2016 = pd.read_csv(r"C:\Users\Betty\Desktop\Agile\fall2016_math.csv")
spring2017 = pd.read_csv(r"C:\Users\Betty\Desktop\Agile\spring2017_math.csv")
fall2017 = pd.read_csv(r"C:\Users\Betty\Desktop\Agile\fall2017_math.csv")
spring2018 = pd.read_csv(r"C:\Users\Betty\Desktop\Agile\spring2018_math.csv")
fall2018 = pd.read_csv(r"C:\Users\Betty\Desktop\Agile\fall2018_math.csv")
spring2019 = pd.read_csv(r"C:\Users\Betty\Desktop\Agile\spring2019_math.csv")

fall2019 = pd.read_csv(r"C:\Users\Betty\Desktop\Agile\fall2019_math.csv")
spring2020 = pd.read_csv(r"C:\Users\Betty\Desktop\Agile\spring2020_math.csv")
fall2020 = pd.read_csv(r"C:\Users\Betty\Desktop\Agile\fall2020_math.csv")
spring2021 = pd.read_csv(r"C:\Users\Betty\Desktop\Agile\spring2021_math.csv")

for i in range(len(fall2019)):
    fall2019["Course"] = fall2019["Course"].replace(" ","",regex=True)
    fall2019["CourseTitle"] = fall2019["CourseTitle"].replace(" ","",regex=True)
    
for i in range(len(spring2020)):
    spring2020["Course"] = spring2020["Course"].replace(" ","",regex=True)
    spring2020["CourseTitle"] = spring2020["CourseTitle"].replace(" ","",regex=True)
    
for i in range(len(fall2020)):
    fall2020["Course"] = fall2020["Course"].replace(" ","",regex=True)
    fall2020["CourseTitle"] = fall2020["CourseTitle"].replace(" ","",regex=True)
    
for i in range(len(spring2021)):
    spring2021["Course"] = spring2021["Course"].replace(" ","",regex=True)
    spring2021["CourseTitle"] = spring2021["CourseTitle"].replace(" ","",regex=True)

df2019f = fall2019.groupby(['Course Title']).mean()
df2019f.reset_index(inplace=True)
df2019f = df2019f[['Course Title','Enrollment Cap','Waitlist Cap']]

df2020s = spring2020.groupby(['Course Title']).mean()
df2020s.reset_index(inplace=True)
df2020s = df2020s[['Course Title','Enrollment Cap','Waitlist Cap']]

df2019f[['Enrollment Cap','Waitlist Cap']] = df2019f[['Enrollment Cap','Waitlist Cap']].round().astype(int)
df2020s[['Enrollment Cap','Waitlist Cap']] = df2020s[['Enrollment Cap','Waitlist Cap']].round().astype(int)

fall2016['WaitlistCap'] = 0

for i in range(len(fall2016)):
    fall2016["Course"] = fall2016["Course"].replace(" ","",regex=True)
    fall2016["CourseTitle"] = fall2016["CourseTitle"].replace(" ","",regex=True)
    for j in range(len(df2019f['CourseTitle'])):
        if fall2016["CourseTitle"][i] == df2019f["CourseTitle"][j]:
            if df2019f["EnrollmentCap"][j] % 10 != 0:
                fall2016["EnrollmentCap"][i] = randrange(df2019f["EnrollmentCap"][j]-1,df2019f["EnrollmentCap"][j]+1)
            else:
                fall2016["EnrollmentCap"][i] = df2019f["EnrollmentCap"][j]
            if df2019f["WaitlistCap"][j] % 10 != 0:
                fall2016["WaitlistCap"][i] = randrange(df2019f["WaitlistCap"][j]-1,df2019f["WaitlistCap"][j]+1)
            else:
                fall2016["WaitlistCap"][i] = df2019f["WaitlistCap"][j]
            break
        
spring2017['WaitlistCap'] = 0

for i in range(len(spring2017)):
    spring2017["Course"] = spring2017["Course"].replace(" ","",regex=True)
    spring2017["CourseTitle"] = spring2017["CourseTitle"].replace(" ","",regex=True)
    for j in range(len(df2020s['CourseTitle'])):
        if spring2017["CourseTitle"][i] == df2020s["CourseTitle"][j]:
            if df2020s["EnrollmentCap"][j] % 10 != 0:
                spring2017["EnrollmentCap"][i] = randrange(df2020s["EnrollmentCap"][j]-1,df2020s["EnrollmentCap"][j]+1)
            else:
                spring2017["EnrollmentCap"][i] = df2020s["EnrollmentCap"][j]
            if df2020s["WaitlistCap"][j] % 10 != 0:
                spring2017["WaitlistCap"][i] = randrange(df2020s["WaitlistCap"][j]-1,df2020s["WaitlistCap"][j]+1)
            else:
                spring2017["WaitlistCap"][i] = df2020s["WaitlistCap"][j]
            break
        
fall2017['WaitlistCap'] = 0

for i in range(len(fall2017)):
    fall2017["Course"] = fall2017["Course"].replace(" ","",regex=True)
    fall2017["CourseTitle"] = fall2017["CourseTitle"].replace(" ","",regex=True)
    for j in range(len(df2019f['CourseTitle'])):
        if fall2017["CourseTitle"][i] == df2019f["CourseTitle"][j]:
            if df2019f["EnrollmentCap"][j] % 10 != 0:
                fall2017["EnrollmentCap"][i] = randrange(df2019f["EnrollmentCap"][j]-1,df2019f["EnrollmentCap"][j]+1)
            else:
                fall2017["EnrollmentCap"][i] = df2019f["EnrollmentCap"][j]
            if df2019f["WaitlistCap"][j] % 10 != 0:
                fall2017["WaitlistCap"][i] = randrange(df2019f["WaitlistCap"][j]-1,df2019f["WaitlistCap"][j]+1)
            else:
                fall2017["WaitlistCap"][i] = df2019f["WaitlistCap"][j]
            break
        
spring2018['WaitlistCap'] = 0

for i in range(len(spring2018)):
    spring2018["Course"] = spring2018["Course"].replace(" ","",regex=True)
    spring2018["CourseTitle"] = spring2018["CourseTitle"].replace(" ","",regex=True)
    for j in range(len(df2020s['CourseTitle'])):
        if spring2018["CourseTitle"][i] == df2020s["CourseTitle"][j]:
            if df2020s["EnrollmentCap"][j] % 10 != 0:
                spring2018["EnrollmentCap"][i] = randrange(df2020s["EnrollmentCap"][j]-1,df2020s["EnrollmentCap"][j]+1)
            else:
                spring2018["EnrollmentCap"][i] = df2020s["EnrollmentCap"][j]
            if df2020s["WaitlistCap"][j] % 10 != 0:
                spring2018["WaitlistCap"][i] = randrange(df2020s["WaitlistCap"][j]-1,df2020s["WaitlistCap"][j]+1)
            else:
                spring2018["WaitlistCap"][i] = df2020s["WaitlistCap"][j]
            break
        
fall2018['WaitlistCap'] = 0

for i in range(len(fall2018)):
    fall2018["Course"] = fall2018["Course"].replace(" ","",regex=True)
    fall2018["CourseTitle"] = fall2018["CourseTitle"].replace(" ","",regex=True)
    for j in range(len(df2019f['CourseTitle'])):
        if fall2018["CourseTitle"][i] == df2019f["CourseTitle"][j]:
            if df2019f["EnrollmentCap"][j] % 10 != 0:
                fall2018["EnrollmentCap"][i] = randrange(df2019f["EnrollmentCap"][j]-1,df2019f["EnrollmentCap"][j]+1)
            else:
                fall2018["EnrollmentCap"][i] = df2019f["EnrollmentCap"][j]
            if df2019f["WaitlistCap"][j] % 10 != 0:
                fall2018["WaitlistCap"][i] = randrange(df2019f["WaitlistCap"][j]-1,df2019f["WaitlistCap"][j]+1)
            else:
                fall2018["WaitlistCap"][i] = df2019f["WaitlistCap"][j]
            break

spring2019['WaitlistCap'] = 0

for i in range(len(spring2019)):
    spring2019["Course"] = spring2019["Course"].replace(" ","",regex=True)
    spring2019["CourseTitle"] = spring2019["CourseTitle"].replace(" ","",regex=True)
    for j in range(len(df2020s['CourseTitle'])):
        if spring2019["CourseTitle"][i] == df2020s["CourseTitle"][j]:
            if df2020s["EnrollmentCap"][j] % 10 != 0:
                spring2019["EnrollmentCap"][i] = randrange(df2020s["EnrollmentCap"][j]-1,df2020s["EnrollmentCap"][j]+1)
            else:
                spring2019["EnrollmentCap"][i] = df2020s["EnrollmentCap"][j]
            if df2020s["WaitlistCap"][j] % 10 != 0:
                spring2019["WaitlistCap"][i] = randrange(df2020s["WaitlistCap"][j]-1,df2020s["WaitlistCap"][j]+1)
            else:
                spring2019["WaitlistCap"][i] = df2020s["WaitlistCap"][j]
            break

fall2016.to_csv(r'C:\Users\Betty\Desktop\Agile\data_simulation\fall2016.csv', index = False)
spring2017.to_csv(r'C:\Users\Betty\Desktop\Agile\data_simulation\spring2017.csv', index = False)
fall2017.to_csv(r'C:\Users\Betty\Desktop\Agile\data_simulation\fall2017.csv', index = False)
spring2018.to_csv(r'C:\Users\Betty\Desktop\Agile\data_simulation\spring2018.csv', index = False)
fall2018.to_csv(r'C:\Users\Betty\Desktop\Agile\data_simulation\fall2018.csv', index = False)
spring2019.to_csv(r'C:\Users\Betty\Desktop\Agile\data_simulation\spring2019.csv', index = False)

fall2019.to_csv(r'C:\Users\Betty\Desktop\Agile\data_simulation\fall2019.csv', index = False)
spring2020.to_csv(r'C:\Users\Betty\Desktop\Agile\data_simulation\spring2020.csv', index = False)
fall2020.to_csv(r'C:\Users\Betty\Desktop\Agile\data_simulation\fall2020.csv', index = False)
spring2021.to_csv(r'C:\Users\Betty\Desktop\Agile\data_simulation\spring2021.csv', index = False)
