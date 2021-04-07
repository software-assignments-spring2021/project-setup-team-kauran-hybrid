import pandas as pd
import numpy as np 
from faker.providers.person.en import Provider
print('Hello Python')

def random_names(name_type,size):
    names=getattr(Provider,name_type)
    return np.random.choice(names,size=size)

size=10
df=pd.DataFrame(columns=['First','Last'])
df['First']=random_names('first_names',size)
df['Last']=random_names('last_names',size)

df.to_csv('test-file.csv')