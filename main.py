import os
import glob
import pandas as pd
import time
import shutil
import re
from dotenv import load_dotenv
import google.generativeai as genai
import pypdf
import json


load_dotenv()
