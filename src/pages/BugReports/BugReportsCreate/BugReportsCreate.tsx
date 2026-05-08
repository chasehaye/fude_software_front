import CreateListForm from '../../../componenets/CreateListForm/CreateListForm.tsx';
import NavBar from '../../../componenets/NavBar/NavBar/NavBar.tsx';

function BugReportCreate() {
  return (
    <div className="flex flex-col min-h-screen font-roboto uppercase">
      <NavBar />
      <CreateListForm listType="BUG" />
    </div>
  );
}

export default BugReportCreate;
