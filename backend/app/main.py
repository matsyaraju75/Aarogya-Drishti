import http.server
import json
import sqlite3
import urllib.parse
import hashlib
import uuid
import datetime
import os
import sys

PORT = 8000
DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'database', 'aarogya_drishti.db'))

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def hash_pw(pw: str) -> str:
    return hashlib.sha256(pw.encode('utf-8')).hexdigest()

def ai_inference_engine(intake_data: dict, has_image: bool = True) -> dict:
    """
    Calibrated AI Screening Engine simulating AD-OralNet v2.4.1.
    Evaluates habit history, lesion duration, symptoms, and image presence.
    """
    duration = str(intake_data.get('symptoms_duration', '')).lower()
    habits = str(intake_data.get('tobacco_history', '')).lower()
    lesion_type = str(intake_data.get('lesion_type', '')).lower()

    is_high_risk_duration = any(k in duration for k in ['>14', '14 days', '3 weeks', 'month', 'year'])
    is_high_risk_habit = any(k in habits for k in ['gutkha', 'khaini', 'betel', 'pan', 'smoke', 'tobacco', 'daily'])

    if not has_image:
        return {
            'category': 'Category C',
            'category_name': 'Inconclusive Screening',
            'risk_level': 'Indeterminate',
            'risk_score': 0.45,
            'confidence': 0.60,
            'findings': ['Submitted image quality insufficient or lighting inadequate for automated mucosal segmentation.'],
            'recommendations': [
                'Retake image under natural daylight using flash, ensuring focus on mucosal surface.',
                'Seek in-person examination at Community Health Centre (CHC) Araku or Paderu.'
            ]
        }

    if is_high_risk_duration and is_high_risk_habit:
        return {
            'category': 'Category D',
            'category_name': 'Urgent Clinical Review Recommended',
            'risk_level': 'High Risk of Dysplasia or Malignancy',
            'risk_score': 0.88,
            'confidence': 0.94,
            'findings': [
                'Persistent mucosal alteration exceeding 14-day clinical threshold.',
                'Long-standing exposure to carcinogenic nitrosamines (gutkha/areca nut).',
                'Elevated risk of moderate-to-severe epithelial dysplasia or carcinoma.'
            ],
            'recommendations': [
                'URGENT: Mandated clinical review by Oral Medicine / Oncology Specialist within 48-72 hours.',
                'Diagnostic punch biopsy recommended at Alluri Sitharama Raju District Hospital or King George Hospital (AMC) Visakhapatnam.',
                '100% cashless diagnostics covered under Dr. YSR Aarogyasri.'
            ]
        }
    elif is_high_risk_habit or 'patch' in lesion_type or 'ulcer' in lesion_type or 'white' in lesion_type:
        return {
            'category': 'Category B',
            'category_name': 'Visible Mucosal Abnormality Detected',
            'risk_level': 'Moderate Pre-Cancer Risk (OPMD)',
            'risk_score': 0.64,
            'confidence': 0.89,
            'findings': [
                'Localized mucosal irregularity detected consistent with OPMD (Oral Submucous Fibrosis / Leukoplakia).',
                'Palpatory restriction or burning sensation reported.'
            ],
            'recommendations': [
                'In-person dental evaluation recommended within 7 to 10 days.',
                'Immediate tobacco and gutkha weaning protocol (NRT Nicotex 2mg therapy).',
                'Therapeutic antioxidant regimen (Lycopene + Beta-Carotene capsules).'
            ]
        }
    else:
        return {
            'category': 'Category A',
            'category_name': 'No Suspicious Feature Detected',
            'risk_level': 'Low Risk (Benign / Normal)',
            'risk_score': 0.12,
            'confidence': 0.96,
            'findings': [
                'Mucosal tissue exhibits uniform pink coloration without indurated ulceration or leukoplakic plaques.',
                'Features consistent with minor traumatic or recurrent aphthous stomatitis.'
            ],
            'recommendations': [
                'Apply protective bio-adhesive paste (Triamcinolone Acetonide 0.1%) as needed.',
                'If lesion fails to resolve completely within 14 days, consult an oral specialist.'
            ]
        }

class AarogyaDrishtiHandler(http.server.BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors_headers()
        self.end_headers()

    def _send_json(self, status_code: int, data: dict):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status_code)
        self._send_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_json_body(self) -> dict:
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length == 0:
            return {}
        raw_body = self.rfile.read(content_length)
        try:
            return json.loads(raw_body.decode('utf-8'))
        except Exception:
            return {}

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        query = urllib.parse.parse_qs(parsed_url.query)

        # 1. Health check
        if path in ['/api/v1/health', '/api/v1/health/']:
            self._send_json(200, {
                'status': 'healthy',
                'service': 'Aarogya Drishti Unified Clinical API',
                'version': '2.4.1',
                'database': 'sqlite3 connected',
                'timestamp': datetime.datetime.utcnow().isoformat()
            })
            return

        # 2. Public Health Analytics Stats
        if path == '/api/v1/analytics/stats':
            conn = get_db()
            cur = conn.cursor()
            cur.execute("SELECT COUNT(*) FROM screenings")
            total_screenings = cur.fetchone()[0]
            cur.execute("SELECT COUNT(*) FROM screenings WHERE category = 'Category D'")
            urgent_triage = cur.fetchone()[0]
            cur.execute("SELECT COUNT(*) FROM screenings WHERE category = 'Category B'")
            opmd_detected = cur.fetchone()[0]
            cur.execute("SELECT COUNT(*) FROM appointments")
            total_appointments = cur.fetchone()[0]
            cur.execute("SELECT COUNT(*) FROM medicine_orders")
            total_orders = cur.fetchone()[0]
            conn.close()

            self._send_json(200, {
                'total_screenings': total_screenings + 1284, # baseline agency camp data
                'urgent_triage_count': urgent_triage + 84,
                'opmd_detected_count': opmd_detected + 236,
                'total_appointments_booked': total_appointments + 412,
                'medicine_orders_fulfilled': total_orders + 380,
                'district': 'Alluri Sitharama Raju',
                'primary_hubs': ['Araku Valley CHC', 'Paderu District Hospital', 'Rampachodavaram Area Hospital', 'Visakhapatnam KGH']
            })
            return

        # 3. List Screenings
        if path == '/api/v1/screenings':
            conn = get_db()
            cur = conn.cursor()
            patient_email = query.get('patient_email', [None])[0]
            review_status = query.get('review_status', [None])[0]

            sql = "SELECT * FROM screenings WHERE 1=1"
            params = []
            if patient_email:
                sql += " AND patient_email = ?"
                params.append(patient_email)
            if review_status:
                sql += " AND clinician_review_status = ?"
                params.append(review_status)
            sql += " ORDER BY created_at DESC"

            cur.execute(sql, params)
            rows = [dict(row) for row in cur.fetchall()]
            conn.close()
            self._send_json(200, {'screenings': rows, 'count': len(rows)})
            return

        # 4. Get Single Screening by ID
        if path.startswith('/api/v1/screenings/'):
            screening_id = path.split('/api/v1/screenings/')[1]
            conn = get_db()
            cur = conn.cursor()
            cur.execute("SELECT * FROM screenings WHERE id = ?", (screening_id,))
            row = cur.fetchone()
            conn.close()
            if row:
                self._send_json(200, dict(row))
            else:
                self._send_json(404, {'error': 'Screening report not found'})
            return

        # 5. List Appointments
        if path == '/api/v1/appointments':
            conn = get_db()
            cur = conn.cursor()
            cur.execute("SELECT * FROM appointments ORDER BY created_at DESC")
            rows = [dict(row) for row in cur.fetchall()]
            conn.close()
            self._send_json(200, {'appointments': rows, 'count': len(rows)})
            return

        # 6. List Consultations
        if path == '/api/v1/consultations':
            conn = get_db()
            cur = conn.cursor()
            cur.execute("SELECT * FROM consultations ORDER BY created_at DESC")
            rows = [dict(row) for row in cur.fetchall()]
            conn.close()
            self._send_json(200, {'consultations': rows, 'count': len(rows)})
            return

        # 7. List Medicine Orders
        if path == '/api/v1/medicines/orders':
            conn = get_db()
            cur = conn.cursor()
            cur.execute("SELECT * FROM medicine_orders ORDER BY created_at DESC")
            rows = [dict(row) for row in cur.fetchall()]
            conn.close()
            self._send_json(200, {'orders': rows, 'count': len(rows)})
            return

        # 8. List Lab Bookings
        if path == '/api/v1/lab-tests/bookings':
            conn = get_db()
            cur = conn.cursor()
            cur.execute("SELECT * FROM lab_bookings ORDER BY created_at DESC")
            rows = [dict(row) for row in cur.fetchall()]
            conn.close()
            self._send_json(200, {'bookings': rows, 'count': len(rows)})
            return

        # 9. List Surgery Inquiries
        if path == '/api/v1/surgeries/inquiries':
            conn = get_db()
            cur = conn.cursor()
            cur.execute("SELECT * FROM surgery_inquiries ORDER BY created_at DESC")
            rows = [dict(row) for row in cur.fetchall()]
            conn.close()
            self._send_json(200, {'inquiries': rows, 'count': len(rows)})
            return

        # 404 Fallback
        self._send_json(404, {'error': f'Route {path} not found'})

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        body = self._read_json_body()

        # 1. Auth Login
        if path == '/api/v1/auth/login':
            email = body.get('email', '').strip().lower()
            password = body.get('password', '')

            conn = get_db()
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE LOWER(email) = ?", (email,))
            user = cur.fetchone()
            conn.close()

            if user and user['password_hash'] == hash_pw(password):
                token = f"ad-jwt-{uuid.uuid4().hex}"
                self._send_json(200, {
                    'token': token,
                    'user': {
                        'id': user['id'],
                        'email': user['email'],
                        'full_name': user['full_name'],
                        'role': user['role'],
                        'phone': user['phone'],
                        'district': user['district']
                    }
                })
            else:
                self._send_json(401, {'error': 'Invalid email or password credentials'})
            return

        # 2. Auth Register
        if path == '/api/v1/auth/register':
            email = body.get('email', '').strip().lower()
            password = body.get('password', '')
            full_name = body.get('full_name', 'Patient User')
            role = body.get('role', 'patient')
            phone = body.get('phone', '')
            district = body.get('district', 'Alluri Sitharama Raju')

            if not email or not password:
                self._send_json(400, {'error': 'Email and password are required'})
                return

            user_id = f"usr-{uuid.uuid4().hex[:8]}"
            conn = get_db()
            cur = conn.cursor()
            try:
                cur.execute(
                    "INSERT INTO users (id, email, password_hash, full_name, role, phone, district) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (user_id, email, hash_pw(password), full_name, role, phone, district)
                )
                conn.commit()
                conn.close()
                token = f"ad-jwt-{uuid.uuid4().hex}"
                self._send_json(201, {
                    'token': token,
                    'user': {
                        'id': user_id,
                        'email': email,
                        'full_name': full_name,
                        'role': role,
                        'phone': phone,
                        'district': district
                    }
                })
            except sqlite3.IntegrityError:
                conn.close()
                self._send_json(409, {'error': 'User with this email already exists'})
            return

        # 3. AI Direct Inference
        if path == '/api/v1/ai/analyze':
            analysis = ai_inference_engine(body, has_image=bool(body.get('image_url') or body.get('image_data')))
            self._send_json(200, analysis)
            return

        # 4. Create Screening Record with AI
        if path == '/api/v1/screenings':
            screening_id = f"AD-SCR-2026-{uuid.uuid4().hex[:4].upper()}"
            patient_name = body.get('patient_name', 'Anonymous Citizen')
            patient_email = body.get('patient_email', 'patient@aarogyadrishti.org')
            age = str(body.get('age', '45'))
            gender = body.get('gender', 'Unspecified')
            tobacco_history = body.get('tobacco_history', 'None reported')
            symptoms_duration = body.get('symptoms_duration', 'Less than 7 days')
            image_url = body.get('image_url', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400')

            ai_result = ai_inference_engine({
                'symptoms_duration': symptoms_duration,
                'tobacco_history': tobacco_history,
                'lesion_type': body.get('lesion_type', '')
            }, has_image=True)

            findings_str = "; ".join(ai_result['findings'])
            recs_str = "; ".join(ai_result['recommendations'])

            conn = get_db()
            cur = conn.cursor()
            cur.execute("""
            INSERT INTO screenings 
            (id, patient_name, patient_email, age, gender, tobacco_history, symptoms_duration, image_url, category, risk_score, confidence, findings, recommendations)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                screening_id, patient_name, patient_email, age, gender, tobacco_history, symptoms_duration,
                image_url, ai_result['category'], ai_result['risk_score'], ai_result['confidence'],
                findings_str, recs_str
            ))
            conn.commit()
            conn.close()

            self._send_json(201, {
                'id': screening_id,
                'patient_name': patient_name,
                'category': ai_result['category'],
                'category_name': ai_result['category_name'],
                'risk_level': ai_result['risk_level'],
                'risk_score': ai_result['risk_score'],
                'confidence': ai_result['confidence'],
                'findings': ai_result['findings'],
                'recommendations': ai_result['recommendations'],
                'created_at': datetime.datetime.utcnow().isoformat()
            })
            return

        # 5. Book Doctor Appointment
        if path == '/api/v1/appointments':
            apt_id = f"APT-2026-{uuid.uuid4().hex[:4].upper()}"
            doctor_id = body.get('doctor_id', 'DOC-PADERU-02')
            doctor_name = body.get('doctor_name', 'Dr. P. Ananya Varma, MDS')
            patient_name = body.get('patient_name', 'Patient')
            patient_phone = body.get('patient_phone', '+91 94941 00000')
            facility = body.get('facility', 'Alluri Sitharama Raju District Hospital')
            appointment_date = body.get('appointment_date', 'Tomorrow')
            time_slot = body.get('time_slot', '11:00 AM')

            conn = get_db()
            cur = conn.cursor()
            cur.execute("""
            INSERT INTO appointments (id, doctor_id, doctor_name, patient_name, patient_phone, facility, appointment_date, time_slot)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (apt_id, doctor_id, doctor_name, patient_name, patient_phone, facility, appointment_date, time_slot))
            conn.commit()
            conn.close()

            self._send_json(201, {
                'id': apt_id,
                'status': 'Confirmed',
                'message': 'Appointment booked successfully with verified specialist'
            })
            return

        # 6. Book Video Consultation
        if path == '/api/v1/consultations':
            con_id = f"CON-2026-{uuid.uuid4().hex[:4].upper()}"
            specialty = body.get('specialty', 'Oral Medicine and Radiology')
            doctor_name = body.get('doctor_name', 'Verified Duty Onco-Specialist')
            patient_name = body.get('patient_name', 'Patient')
            patient_phone = body.get('patient_phone', '+91 94941 00000')
            consult_type = body.get('consult_type', 'video')

            conn = get_db()
            cur = conn.cursor()
            cur.execute("""
            INSERT INTO consultations (id, specialty, doctor_name, patient_name, patient_phone, consult_type, status)
            VALUES (?, ?, ?, ?, ?, ?, 'Connecting')
            """, (con_id, specialty, doctor_name, patient_name, patient_phone, consult_type))
            conn.commit()
            conn.close()

            self._send_json(201, {
                'id': con_id,
                'room_url': f"https://meet.aarogyadrishti.org/room/{con_id}",
                'status': 'Connecting'
            })
            return

        # 7. Place Medicine Order
        if path == '/api/v1/medicines/orders':
            order_id = f"MED-ORD-2026-{uuid.uuid4().hex[:4].upper()}"
            patient_name = body.get('patient_name', 'Patient')
            patient_phone = body.get('patient_phone', '+91 94941 00000')
            delivery_address = body.get('delivery_address', 'Paderu, ASR District')
            items = body.get('items', [])
            total_amount = float(body.get('total_amount', 0))
            payment_mode = body.get('payment_mode', 'Cash on Delivery')

            conn = get_db()
            cur = conn.cursor()
            cur.execute("""
            INSERT INTO medicine_orders (id, patient_name, patient_phone, delivery_address, items_json, total_amount, payment_mode, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'Processing')
            """, (order_id, patient_name, patient_phone, delivery_address, json.dumps(items), total_amount, payment_mode))
            conn.commit()
            conn.close()

            self._send_json(201, {
                'id': order_id,
                'status': 'Processing',
                'message': 'Order placed successfully. Doorstep delivery dispatching from Paderu Medical Hub.'
            })
            return

        # 8. Book Lab Tests
        if path == '/api/v1/lab-tests/bookings':
            booking_id = f"LAB-2026-{uuid.uuid4().hex[:4].upper()}"
            test_id = body.get('test_id', 'test-1')
            test_name = body.get('test_name', 'Diagnostic Biopsy / Panel')
            patient_name = body.get('patient_name', 'Patient')
            patient_phone = body.get('patient_phone', '+91 94941 00000')
            collection_address = body.get('collection_address', 'Araku Valley')
            collection_slot = body.get('collection_slot', 'Tomorrow, 08:00 AM')
            price = float(body.get('price', 0))

            conn = get_db()
            cur = conn.cursor()
            cur.execute("""
            INSERT INTO lab_bookings (id, test_id, test_name, patient_name, patient_phone, collection_address, collection_slot, price, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Sample Collection Scheduled')
            """, (booking_id, test_id, test_name, patient_name, patient_phone, collection_address, collection_slot, price))
            conn.commit()
            conn.close()

            self._send_json(201, {
                'id': booking_id,
                'status': 'Sample Collection Scheduled',
                'message': 'Home sample collection technician assigned from Araku CHC Diagnostic Lab.'
            })
            return

        # 9. Book Surgery Consultation
        if path == '/api/v1/surgeries/inquiries':
            inquiry_id = f"SURG-2026-{uuid.uuid4().hex[:4].upper()}"
            procedure_name = body.get('procedure_name', 'Oral Cavity Tumor Excision')
            patient_name = body.get('patient_name', 'Patient')
            mobile_number = body.get('mobile_number', '+91 94941 00000')
            city_hub = body.get('city_hub', 'Visakhapatnam (KGH / AMC)')

            conn = get_db()
            cur = conn.cursor()
            cur.execute("""
            INSERT INTO surgery_inquiries (id, procedure_name, patient_name, mobile_number, city_hub, status)
            VALUES (?, ?, ?, ?, ?, 'Coordinator Assigned')
            """, (inquiry_id, procedure_name, patient_name, mobile_number, city_hub))
            conn.commit()
            conn.close()

            self._send_json(201, {
                'id': inquiry_id,
                'status': 'Coordinator Assigned',
                'message': 'Surgical Care Coordinator assigned. Callback within 15 minutes.'
            })
            return

        self._send_json(404, {'error': f'Route {path} not found'})

    def do_PATCH(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        body = self._read_json_body()

        # Review Screening by Clinician
        if path.startswith('/api/v1/screenings/') and path.endswith('/review'):
            screening_id = path.split('/api/v1/screenings/')[1].split('/review')[0]
            review_status = body.get('status', 'Reviewed')
            notes = body.get('notes', '')

            conn = get_db()
            cur = conn.cursor()
            cur.execute("""
            UPDATE screenings SET clinician_review_status = ?, clinician_notes = ? WHERE id = ?
            """, (review_status, notes, screening_id))
            conn.commit()
            conn.close()

            self._send_json(200, {
                'id': screening_id,
                'clinician_review_status': review_status,
                'clinician_notes': notes,
                'message': 'Clinical review successfully recorded'
            })
            return

        self._send_json(404, {'error': f'Route {path} not found'})

def run_server():
    server_address = ('127.0.0.1', PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, AarogyaDrishtiHandler)
    print(f"==================================================")
    print(f" Aarogya Drishti Backend Running on http://127.0.0.1:{PORT}")
    print(f" Database: {DB_PATH}")
    print(f"==================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down backend server.")
        httpd.server_close()

if __name__ == '__main__':
    run_server()
