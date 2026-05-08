import NavBar from '../../componenets/NavBar/NavBar/NavBar';

function ServiceStatus() {
  return (
    <div className="flex flex-col min-h-screen font-roboto uppercase">
      <NavBar />
      <div className="p-10 w-full text-center">
        <h1 className="text-2xl font-bold text-white mb-6">Service_Status</h1>
        <div className="max-w-xl mx-auto text-left border border-edge p-6 flex flex-col gap-4">
          <p>
            <span className="text-white">Current_Status: </span>
            Non_Operational
          </p>
          <p>
            <span className="text-white">Reason: </span>
            This application uses Amazon SES for email delivery. The account is
            currently operating in sandbox mode, which requires AWS approval to
            send emails to unverified recipients. There is no current plan to
            pursue approval. However, the repository is publicly available —
            anyone can clone it, configure their own AWS SES credentials, and
            run the application in sandbox mode or pursue production approval
            independently. The codebase is also open to expansion and
            improvement upon the current implementation.
          </p>
          <p>
            <span className="text-white">Note: </span>
            During development the scope of this project grew beyond its
            original architecture. Rather than continuing to build on a
            foundation that would require significant revision, this project is
            being set aside in favor of a future application with improved
            architecture and a cleaner implementation of the same concepts.
          </p>
          <p>
            <span className="text-white">Takeaway: </span>
            The core features — mailing lists, subscriber management, inbound
            messaging, and email relay — are functional within the sandbox
            environment and demonstrate the intended architecture.
          </p>
          <p>
            <span className="text-white">Explore: </span>
            Despite the current limitations, much of the application remains
            functional. You are encouraged to navigate the platform, create
            mailing lists, manage subscribers, submit bug reports and inquiries,
            and explore the inbound messaging flow to get a sense of what has
            been built and what the full implementation would look like in a
            production environment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServiceStatus;
