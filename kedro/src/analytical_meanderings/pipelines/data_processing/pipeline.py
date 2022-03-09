"""
This is a boilerplate pipeline 'data_processing'
generated using Kedro 0.17.7
"""

from kedro.pipeline import Pipeline, node, pipeline

from .nodes import preprocess_dmf


def create_pipeline(**kwargs) -> Pipeline:
    return pipeline(
	[
	    node(
		func=preprocess_dmf,
		inputs="dmf",
		outputs="preprocessed_dmf",
		name="preprocess_dmf_node",
	    ),


    	]
    )
