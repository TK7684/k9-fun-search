import { useState, type FormEvent } from 'react';
import { useApp } from '../../context/AppContext';

interface FieldErrors {
  dogName: string;
  dogBreed: string;
  handlerName: string;
}

function validateField(name: keyof FieldErrors, value: string): string {
  if (!value.trim()) {
    switch (name) {
      case 'dogName': return 'กรุณากรอกชื่อสุนัข';
      case 'dogBreed': return 'กรุณากรอกสายพันธุ์';
      case 'handlerName': return 'กรุณากรอกชื่อผู้ควบคุม';
    }
  }
  return '';
}

export default function RegistrationForm() {
  const { addDog, dogs, showToast } = useApp();
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [handlerName, setHandlerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<{ dogName: boolean; dogBreed: boolean; handlerName: boolean }>({
    dogName: false,
    dogBreed: false,
    handlerName: false,
  });

  const errors: FieldErrors = {
    dogName: validateField('dogName', dogName),
    dogBreed: validateField('dogBreed', dogBreed),
    handlerName: validateField('handlerName', handlerName),
  };

  const showError = (field: keyof FieldErrors): boolean =>
    submitted || touched[field];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    if (errors.dogName || errors.dogBreed || errors.handlerName) return;

    const manualDogCount = dogs.filter(d => typeof d.id === 'number').length;
    if (manualDogCount >= 20) {
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
    setSubmitted(false);
    setTouched({ dogName: false, dogBreed: false, handlerName: false });

    showToast('ลงทะเบียนสำเร็จ! 🎉', 'success');
  }

  return (
    <div className="form-card">
      <h3>➕ ลงทะเบียนสุนัขใหม่</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="input-group">
          <label>ชื่อสุนัข</label>
          <input
            type="text"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, dogName: true }))}
            placeholder="กรอกชื่อสุนัข"
            required
          />
          {showError('dogName') && errors.dogName && (
            <span className="field-error">{errors.dogName}</span>
          )}
        </div>
        <div className="input-group">
          <label>สายพันธุ์</label>
          <input
            type="text"
            value={dogBreed}
            onChange={(e) => setDogBreed(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, dogBreed: true }))}
            placeholder="กรอกสายพันธุ์"
            required
          />
          {showError('dogBreed') && errors.dogBreed && (
            <span className="field-error">{errors.dogBreed}</span>
          )}
        </div>
        <div className="input-group">
          <label>ชื่อผู้ควบคุม</label>
          <input
            type="text"
            value={handlerName}
            onChange={(e) => setHandlerName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, handlerName: true }))}
            placeholder="กรอกชื่อผู้ควบคุม"
            required
          />
          {showError('handlerName') && errors.handlerName && (
            <span className="field-error">{errors.handlerName}</span>
          )}
        </div>
        <button type="submit" className="submit-btn">
          ✨ ลงทะเบียน
        </button>
      </form>
    </div>
  );
}
