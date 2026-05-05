import { useState, type FormEvent } from 'react';
import { useApp } from '../../context/AppContext';

export default function RegistrationForm() {
  const { addDog, dogs, showToast } = useApp();
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [handlerName, setHandlerName] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (dogs.length >= 20) {
      showToast('เต็มจำนวนแล้ว (20 สุนัข)', 'error');
      return;
    }

    const name = dogName.trim();
    const breed = dogBreed.trim();
    const handler = handlerName.trim();

    if (!name || !breed || !handler) return;

    addDog({ dogName: name, dogBreed: breed, handlerName: handler });

    setDogName('');
    setDogBreed('');
    setHandlerName('');

    showToast('ลงทะเบียนสำเร็จ! 🎉', 'success');
  }

  return (
    <div className="form-card">
      <h3>➕ ลงทะเบียนสุนัขใหม่</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>ชื่อสุนัข</label>
          <input
            type="text"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            placeholder="กรอกชื่อสุนัข"
            required
          />
        </div>
        <div className="input-group">
          <label>สายพันธุ์</label>
          <input
            type="text"
            value={dogBreed}
            onChange={(e) => setDogBreed(e.target.value)}
            placeholder="กรอกสายพันธุ์"
            required
          />
        </div>
        <div className="input-group">
          <label>ชื่อผู้ควบคุม</label>
          <input
            type="text"
            value={handlerName}
            onChange={(e) => setHandlerName(e.target.value)}
            placeholder="กรอกชื่อผู้ควบคุม"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          ✨ ลงทะเบียน
        </button>
      </form>
    </div>
  );
}
