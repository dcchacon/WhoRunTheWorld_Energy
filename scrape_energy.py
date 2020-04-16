
#Import dependencies needed
import pandas as pd

def scrape():

    csv_path = "resources/California_Power_Plants.csv"

    # Import the CSV into a pandas DataFrame
    energy_df = pd.read_csv(csv_path, low_memory=False)
    energy_df


    # In[22]:


    energy_df.columns


    # In[45]:


    energy_df_final = energy_df[['X', 'Y','OBJECTID_12_13', 'Plant_ID', 'Plant_Label',  'MW', 'Gross_MWh', 'Net_MWh', 'General_Fuel', 'Online_Year']]
    energy_df_final


    # In[46]:


    energy_df_final = energy_df_final.rename(columns={'X': 'Longitude', 
                                    'Y': 'Latitude',
                                    'OBJECTID_12_13': 'Object ID', 
                                    'Plant_ID': 'Plant ID', 
                                    'Plant_Label': 'Plant Label',
                                    'MW': 'MW',
                                    'Gross_MWh': 'Gross MWh' ,
                                    'Net_MWh': 'Net MWh',
                                    'General_Fuel': 'General Fuel',
                                    'Online_Year': 'Online Year'})
    energy_df_final


    energy_html = energy_df_final.to_html(index=False)
    energy_html_final = energy_html.replace("\n","").replace("dataframe","table table-sm table-striped table-borderless").replace('border="1"','')
    energy_html_final

    energy_data = {
        'data_table': energy_html.replace("\n","").replace("dataframe","table table-sm table-striped table-borderless").replace('border="1"','')

    }
    # print(energy_data)
    return (energy_data)


if __name__=="__main__":
    data = scrape()
    print(data)



