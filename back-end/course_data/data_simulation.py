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

fall2016 = fall2016.rename(columns={"Watilist Cap":'Waitlist Cap'})
spring2017 = spring2017.rename(columns={"Watilist Cap":'Waitlist Cap'})
fall2017 = fall2017.rename(columns={"Watilist Cap":'Waitlist Cap'})
spring2018 = spring2018.rename(columns={"Watilist Cap":'Waitlist Cap'})
fall2018 = fall2018.rename(columns={"Watilist Cap":'Waitlist Cap'})
spring2019 = spring2019.rename(columns={"Watilist Cap":'Waitlist Cap'})

fall2019 = fall2019.rename(columns={"Watilist Cap":'Waitlist Cap'})
spring2020 = spring2020.rename(columns={"Watilist Cap":'Waitlist Cap'})
fall2020 = fall2020.rename(columns={"Watilist Cap":'Waitlist Cap'})
spring2021 = spring2021.rename(columns={"Watilist Cap":'Waitlist Cap'})

df2019f = fall2019.groupby(['Course Title']).mean()
df2019f.reset_index(inplace=True)
df2019f = df2019f[['Course Title','Enrollment Cap','Waitlist Cap']]

df2020s = spring2020.groupby(['Course Title']).mean()
df2020s.reset_index(inplace=True)
df2020s = df2020s[['Course Title','Enrollment Cap','Waitlist Cap']]

df2019f[['Enrollment Cap','Waitlist Cap']] = df2019f[['Enrollment Cap','Waitlist Cap']].round().astype(int)
df2020s[['Enrollment Cap','Waitlist Cap']] = df2020s[['Enrollment Cap','Waitlist Cap']].round().astype(int)

fall2016['Waitlist Cap'] = 0

for i in range(len(fall2016)):
    for j in range(len(df2019f['Course Title'])):
        if fall2016["Course Title"][i] == df2019f["Course Title"][j]:
            if df2019f["Enrollment Cap"][j] % 10 != 0:
                fall2016["Enrollment Cap"][i] = randrange(df2019f["Enrollment Cap"][j]-1,df2019f["Enrollment Cap"][j]+1)
            else:
                fall2016["Enrollment Cap"][i] = df2019f["Enrollment Cap"][j]
            if df2019f["Waitlist Cap"][j] % 10 != 0:
                fall2016["Waitlist Cap"][i] = randrange(df2019f["Waitlist Cap"][j]-1,df2019f["Waitlist Cap"][j]+1)
            else:
                fall2016["Waitlist Cap"][i] = df2019f["Waitlist Cap"][j]
            break
        
spring2017['Waitlist Cap'] = 0

for i in range(len(spring2017)):
    for j in range(len(df2020s['Course Title'])):
        if spring2017["Course Title"][i] == df2020s["Course Title"][j]:
            if df2020s["Enrollment Cap"][j] % 10 != 0:
                spring2017["Enrollment Cap"][i] = randrange(df2020s["Enrollment Cap"][j]-1,df2020s["Enrollment Cap"][j]+1)
            else:
                spring2017["Enrollment Cap"][i] = df2020s["Enrollment Cap"][j]
            if df2020s["Waitlist Cap"][j] % 10 != 0:
                spring2017["Waitlist Cap"][i] = randrange(df2020s["Waitlist Cap"][j]-1,df2020s["Waitlist Cap"][j]+1)
            else:
                spring2017["Waitlist Cap"][i] = df2020s["Waitlist Cap"][j]
            break
        
fall2017['Waitlist Cap'] = 0

for i in range(len(fall2017)):
    for j in range(len(df2019f['Course Title'])):
        if fall2017["Course Title"][i] == df2019f["Course Title"][j]:
            if df2019f["Enrollment Cap"][j] % 10 != 0:
                fall2017["Enrollment Cap"][i] = randrange(df2019f["Enrollment Cap"][j]-1,df2019f["Enrollment Cap"][j]+1)
            else:
                fall2017["Enrollment Cap"][i] = df2019f["Enrollment Cap"][j]
            if df2019f["Waitlist Cap"][j] % 10 != 0:
                fall2017["Waitlist Cap"][i] = randrange(df2019f["Waitlist Cap"][j]-1,df2019f["Waitlist Cap"][j]+1)
            else:
                fall2017["Waitlist Cap"][i] = df2019f["Waitlist Cap"][j]
            break
        
spring2018['Waitlist Cap'] = 0

for i in range(len(spring2018)):
    for j in range(len(df2020s['Course Title'])):
        if spring2018["Course Title"][i] == df2020s["Course Title"][j]:
            if df2020s["Enrollment Cap"][j] % 10 != 0:
                spring2018["Enrollment Cap"][i] = randrange(df2020s["Enrollment Cap"][j]-1,df2020s["Enrollment Cap"][j]+1)
            else:
                spring2018["Enrollment Cap"][i] = df2020s["Enrollment Cap"][j]
            if df2020s["Waitlist Cap"][j] % 10 != 0:
                spring2018["Waitlist Cap"][i] = randrange(df2020s["Waitlist Cap"][j]-1,df2020s["Waitlist Cap"][j]+1)
            else:
                spring2018["Waitlist Cap"][i] = df2020s["Waitlist Cap"][j]
            break
        
fall2018['Waitlist Cap'] = 0

for i in range(len(fall2018)):
    for j in range(len(df2019f['Course Title'])):
        if fall2018["Course Title"][i] == df2019f["Course Title"][j]:
            if df2019f["Enrollment Cap"][j] % 10 != 0:
                fall2018["Enrollment Cap"][i] = randrange(df2019f["Enrollment Cap"][j]-1,df2019f["Enrollment Cap"][j]+1)
            else:
                fall2018["Enrollment Cap"][i] = df2019f["Enrollment Cap"][j]
            if df2019f["Waitlist Cap"][j] % 10 != 0:
                fall2018["Waitlist Cap"][i] = randrange(df2019f["Waitlist Cap"][j]-1,df2019f["Waitlist Cap"][j]+1)
            else:
                fall2018["Waitlist Cap"][i] = df2019f["Waitlist Cap"][j]
            break

spring2019['Waitlist Cap'] = 0

for i in range(len(spring2019)):
    for j in range(len(df2020s['Course Title'])):
        if spring2019["Course Title"][i] == df2020s["Course Title"][j]:
            if df2020s["Enrollment Cap"][j] % 10 != 0:
                spring2019["Enrollment Cap"][i] = randrange(df2020s["Enrollment Cap"][j]-1,df2020s["Enrollment Cap"][j]+1)
            else:
                spring2019["Enrollment Cap"][i] = df2020s["Enrollment Cap"][j]
            if df2020s["Waitlist Cap"][j] % 10 != 0:
                spring2019["Waitlist Cap"][i] = randrange(df2020s["Waitlist Cap"][j]-1,df2020s["Waitlist Cap"][j]+1)
            else:
                spring2019["Waitlist Cap"][i] = df2020s["Waitlist Cap"][j]
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
