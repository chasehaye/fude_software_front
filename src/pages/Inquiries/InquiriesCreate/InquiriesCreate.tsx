import CreateListForm from '../../../componenets/CreateListForm/CreateListForm.tsx';
import NavBar from '../../../componenets/NavBar/NavBar/NavBar.tsx';

function InquiriesCreate() {
  return (
    <div className="flex flex-col min-h-screen font-roboto uppercase">
      <NavBar />
      <CreateListForm listType="INQUIRY" />
    </div>
  );
}

export default InquiriesCreate;
