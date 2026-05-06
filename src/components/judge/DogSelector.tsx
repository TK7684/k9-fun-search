import type { MergedDog } from '../../types';

interface DogSelectorProps {
  dogs: MergedDog[];
  selectedDogId: string;
  onSelect: (dogId: string) => void;
}

export default function DogSelector({ dogs, selectedDogId, onSelect }: DogSelectorProps) {
  return (
    <div className="dog-selector-card">
      <label className="selector-label" htmlFor="dog-select">
        เลือกสุนัขที่จะให้คะแนน
      </label>
      <select
        id="dog-select"
        className="dog-select"
        value={selectedDogId}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- เลือกสุนัข --</option>
        {dogs.map((dog) => (
          <option key={String(dog.id)} value={String(dog.id)}>
            {dog.dogName} - {dog.handlerName}
          </option>
        ))}
      </select>
    </div>
  );
}
