"""
This is a boilerplate pipeline 'data_processing'
generated using Kedro 0.17.7
"""
import pandas as pd

def preprocess_dmf(dmf: pd.DataFrame) -> pd.DataFrame:
    """ Preprocess dmf_data
    
    Args:
        dmf: raw data
        
    Returns:
        Preprocessed data; null values in 'therapeutic_class' removed
    """
    dmf=dmf[dmf.therapeutic_class.notnull()]
    return dmf
