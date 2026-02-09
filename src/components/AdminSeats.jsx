import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function AdminSeats() {
  const [date, setDate] = useState("");
  const [female, setFemale] = useState(0);
  const [male, setMale] = useState(0);

  const handleSave = async () => {
    if (!date) return alert("날짜 선택");

    await setDoc(doc(db, "seats", date), {
      female: Number(female),
      male: Number(male),
    });

    alert("좌석 저장 완료");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>좌석 관리자</h2>

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="number"
        placeholder="여자 좌석"
        onChange={(e) => setFemale(e.target.value)}
      />

      <input
        type="number"
        placeholder="남자 좌석"
        onChange={(e) => setMale(e.target.value)}
      />

      <button onClick={handleSave}>
        저장
      </button>
    </div>
  );
}
