import os
from tqdm import tqdm
import numpy as np
import pandas as pd
import cv2
import time
import re

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from deepface import DeepFace
from deepface.commons import functions
from deepface.detectors import FaceDetector

def analysis(input_data,model_name = 'VGG-Face', detector_backend = 'opencv', distance_metric = 'cosine', enable_face_analysis = True, source = 0, time_threshold = 2, frame_threshold = 2):

	# emotion_model = Interpreter(model_path="facial_expression_model_weights.tflite")
	face_detector = FaceDetector.build_model(detector_backend)
	# print("Detector backend is ", detector_backend)
	face_detected = False
	freezed_frame = 0
	tic = time.time()
	input_shape = (224, 224); input_shape_x = input_shape[0]; input_shape_y = input_shape[1]

	text_color = (255,255,255)

	pivot_img_size = 112

	img = input_data

	raw_img = img.copy()
	resolution = img.shape; resolution_x = img.shape[1]; resolution_y = img.shape[0]
	faces = []

	#faces store list of detected_face and region pair
	faces = FaceDetector.detect_faces(face_detector, detector_backend, img, align = False)

	if len(faces) == 0:
		return None
	
	detected_faces = []
	face_index = 0

	for face, (x, y, w, h) in faces:
		if w > 30: #discard small detected faces
			face_detected = True

			detected_face = img[int(y):int(y+h), int(x):int(x+w)] #crop detected face

			detected_faces.append((x,y,w,h))

			#-------------------------------------

	if face_detected == True:
		#base_img = img.copy()
		base_img = raw_img.copy()
		detected_faces_final = detected_faces.copy()

		if freezed_frame == 0:
			freeze_img = base_img.copy()
			# freeze_img = cv2.cvtColor(base_img, cv2.COLOR_BGR2RGB)
			# freeze_img = np.zeros(resolution, np.uint8) #here, np.uint8 handles showing white area issue

			for detected_face in detected_faces_final:
				x = detected_face[0]; y = detected_face[1]
				w = detected_face[2]; h = detected_face[3]

				#-------------------------------

				#apply deep learning for custom_face

				custom_face = base_img[y:y+h, x:x+w]

				#-------------------------------
				#facial attribute analysis
				if enable_face_analysis == True:

					gray_img = functions.preprocess_face(img = custom_face, target_size = (48, 48), grayscale = True, enforce_detection = False, detector_backend = 'opencv')

					emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']
					emotion_predictions = emotion_model.predict(gray_img)[0,:]

					sum_of_predictions = emotion_predictions.sum()

					mood_items = []
					for i in range(0, len(emotion_labels)):
						mood_item = []
						emotion_label = emotion_labels[i]
						emotion_prediction = 100 * emotion_predictions[i] / sum_of_predictions
						mood_item.append(emotion_label)
						mood_item.append(emotion_prediction)
						mood_items.append(mood_item)
					
					mood_items.sort(key=lambda x:x[1], reverse=True)
					print(mood_items[0][0])
					return mood_items[0][0]

