import NavBar from '../../componenets/NavBar/NavBar/NavBar';

function ApiPage() {
  return (
    <div className="flex flex-col min-h-screen font-roboto">
      <NavBar />
      <div className="p-10 w-full text-center">
        <h1 className="text-2xl font-bold text-white mb-6">API_INFO</h1>
        <div className="max-w-xl mx-auto text-left border border-edge p-6 flex flex-col gap-4">
          <p>
            <span className="text-white">API_Token: </span>
            Your API token can be found under your profile. This token is used
            to authenticate requests to the API and must be included in the
            request header as follows:
          </p>
          <div className="border border-edge p-3 bg-black font-mono text-sm">
            <p className="text-hoverc">X-API-Key: your_token_here</p>
          </div>

          <p>
            <span className="text-white">Send_Inbound_Message: </span>
            To send an inbound message to a list, use the following endpoint.
            The list ID can be found on the detail page of the list you wish to
            send to.
          </p>
          <div className="border border-edge p-3 bg-black font-mono text-sm flex flex-col gap-2">
            <p>
              <span className="text-hoverc">POST</span>{' '}
              /api/public/send/message/:list_id
            </p>
            <p className="text-white">Headers:</p>
            <p className="pl-4">X-API-Key: your_token_here</p>
            <p className="pl-4">Content-Type: application/json</p>
            <p className="text-white">Body:</p>
            <p className="pl-4">{`{`}</p>
            <p className="pl-8">"email": "sender@example.com",</p>
            <p className="pl-8">"header": "Message subject",</p>
            <p className="pl-8">"body": "Message content"</p>
            <p className="pl-4">{`}`}</p>
          </div>

          <p>
            <span className="text-white">List_ID: </span>
            The list ID used in the route is the public ID of the list, which
            can be found on the detail page of any list. In a production
            environment this endpoint would be incorporated directly into your
            application to relay messages, bug reports, or inquiries back to
            this platform.
          </p>

          <p>
            <span className="text-white">Access: </span>
            The endpoint is publicly accessible from any origin but requires a
            valid API token and a list ID that belongs to the authenticated
            user. Requests with invalid tokens or mismatched list ownership will
            be rejected.
          </p>
          <p>
            <span className="text-white">Finding_Your_URL: </span>
            The full endpoint URL for a specific list can be found on the detail
            page of the associated inquiry list or bug report list. Navigate to
            the relevant list, locate the public ID, and construct the request
            URL using the format above.
          </p>
          <div className="border border-edge p-3 bg-black font-mono text-sm flex flex-col gap-2">
            <p className="text-white mt-2">Example:</p>
            <p>
              <span className="text-hoverc">POST</span>{' '}
              /api/public/send/message/:list_id
            </p>
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">{`fetch("https://yourdomain.com/api/public/send/message/YOUR_LIST_ID", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": "YOUR_API_TOKEN"
            },
            body: JSON.stringify({
              email: "sender@example.com",
              header: "Message subject",
              body: "Message content"
            })
          })`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiPage;
