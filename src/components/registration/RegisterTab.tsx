import { useApp } from '../../context/AppContext';
import SheetRegistrations from './SheetRegistrations';
import RegistrationForm from './RegistrationForm';
import DogList from './DogList';

export default function RegisterTab() {
  const { sheetDogs, fetchSheetData, isFetching, fetchError, sheetLastFetch } = useApp();

  return (
    <div className="registration-section">
      <div className="section-header">
        <h2>📋 ลงทะเบียนสุนัข</h2>
        <p className="section-desc">ลงทะเบียนสุนัขเข้าร่วมการแข่งขัน Fun Search</p>
      </div>

      <SheetRegistrations
        sheetDogs={sheetDogs}
        fetchSheetData={fetchSheetData}
        isFetching={isFetching}
        fetchError={fetchError}
        sheetLastFetch={sheetLastFetch}
      />

      <div className="content-grid">
        <RegistrationForm />
        <DogList />
      </div>
    </div>
  );
}
