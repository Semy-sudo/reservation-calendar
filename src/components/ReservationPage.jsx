import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ReservationPage() {
  /* ===============================
     상태값
  =============================== */
  const [selectedDate, setSelectedDate] = useState(null);
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [job, setJob] = useState("");
  const [intro, setIntro] = useState("");
  const [photo, setPhoto] = useState(null);
  const [agree, setAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 🔥 관리자 좌석 (DB)
  const [adminSeats, setAdminSeats] = useState({});

  /* ===============================
     날짜 클릭
  =============================== */
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  /* ===============================
     제출
  =============================== */
  const handleSubmit = () => {
    if (!selectedDate) return alert("날짜를 선택해주세요");
    if (!gender || !name || !phone)
      return alert("필수 정보를 입력해주세요");
    if (!agree) return alert("개인정보 동의 필요");

    setShowModal(true);
  };

  /* ===============================
     DB 좌석 불러오기
  =============================== */
  useEffect(() => {
    const fetchSeats = async () => {
      const querySnapshot = await getDocs(
        collection(db, "seats")
      );

      const data = {};

      querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data();
      });

      setAdminSeats(data);
    };

    fetchSeats();
  }, []);

  /* ===============================
     좌석 계산 로직
  =============================== */

  const today = new Date();

  const getDateDiff = (date) => {
    const diffTime = date - today;
    return Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );
  };

  const getDefaultSeats = (date) => {
    const diff = getDateDiff(date);

    if (diff <= 7) {
      return { female: 3, male: 3 };
    } else {
      return { female: 9, male: 9 };
    }
  };

  const getSeats = (date) => {
    const key = date
      .toISOString()
      .split("T")[0];

    // 관리자 좌석 우선
    if (adminSeats[key]) {
      return adminSeats[key];
    }

    return getDefaultSeats(date);
  };

  /* ===============================
     이벤트 라벨
  =============================== */

  const getEventLabel = (date) => {
    const day = date.getDay();

    if (day === 3) return "술술";
    if (day === 5 || day === 6)
      return "예술";

    return null;
  };

  const seats = selectedDate
    ? getSeats(selectedDate)
    : { female: 0, male: 0 };

  /* ===============================
     화면
  =============================== */

  return (
    <div className="page">
      <h1 className="title">
        YESUL-LING
      </h1>
      <p className="subtitle">
        방문 날짜를 선택해주세요
      </p>

      {/* 달력 */}
      <div className="calendar-card">
        <Calendar
          onClickDay={handleDateClick}
          value={selectedDate}
          tileContent={({
            date,
            view,
          }) => {
            if (view !== "month")
              return null;

            const seats =
              getSeats(date);
            const event =
              getEventLabel(date);

            return (
              <div
                style={{
                  marginTop: "6px",
                  fontSize: "12px",
                }}
              >
      

                {event && (
                  <div
                    style={{
                      color: "#22c55e",
                    }}
                  >
                    {event}
                  </div>
                )}
              </div>
            );
          }}
        />
      </div>

      {/* 예약 폼 */}
      {selectedDate && (
        <div className="form-card">
          <div className="seat-box">
  잔여석 : 여 {seats.female} | 남 {seats.male}
</div>

          {/* 성별 */}
          <select
            className="input"
            value={gender}
            onChange={(e) =>
              setGender(
                e.target.value
              )
            }
          >
            <option value="">
              성별 선택
            </option>
            <option value="여">
              여자
            </option>
            <option value="남">
              남자
            </option>
          </select>

          {/* 이름 */}
          <input
            className="input"
            placeholder="이름"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          {/* 전화번호 */}
          <input
            className="input"
            placeholder="전화번호"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
          />

          {/* 출생연도 */}
          <input
            className="input"
            placeholder="출생연도"
            value={birth}
            onChange={(e) =>
              setBirth(
                e.target.value
              )
            }
          />

          {/* 직업 */}
          <input
            className="input"
            placeholder="직업"
            value={job}
            onChange={(e) =>
              setJob(
                e.target.value
              )
            }
          />

          {/* 소개글 */}
          <textarea
            className="textarea"
            placeholder="간단한 소개"
            value={intro}
            onChange={(e) =>
              setIntro(
                e.target.value
              )
            }
          />

          {/* 사진 */}
          <input
            type="file"
            className="input"
            onChange={(e) =>
              setPhoto(
                e.target.files[0]
              )
            }
          />

          {/* 동의 */}
          <label className="agree">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) =>
                setAgree(
                  e.target.checked
                )
              }
            />
            개인정보 수집 및 이용 동의
          </label>

          {/* 금액 */}
          <div className="price-box">
            결제금액{" "}
            <strong>
              29,000원
            </strong>
          </div>

          {/* 버튼 */}
          <button
            className="reserve-btn"
            onClick={handleSubmit}
          >
            예약 신청하기
          </button>
        </div>
      )}

      {/* 모달 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() =>
                setShowModal(
                  false
                )
              }
            >
              ✕
            </button>

            <h2>입금 안내</h2>

            <div className="account-box">
              <div>
                <p>
                  국민은행
                  (송예인)
                </p>
                <strong>
                  57860201-241169
                </strong>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "57860201-241169"
                  );
                  alert(
                    "계좌 복사 완료"
                  );
                }}
              >
                복사
              </button>
            </div>

            <button
              onClick={() =>
                setShowModal(
                  false
                )
              }
            >
              확인 완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
