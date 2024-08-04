export default function CompanyCourse() {
    return (
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/1702447076/photo/data-center-admin-codes-on-tablet.jpg?s=612x612&w=0&k=20&c=j24cEIAif2r7Jj3u_R0mOQWYs6_VGJfkxrwAkIDRHLo="
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Need a new CV?</h3>
                <p className="text-gray-600 mb-4">
                  Create a professional CV and start applying to jobs today with our
                  free CV Builder.
                  and start applying .
                </p>
                <button className="bg-[#002244] hover:bg-[#1a3857] text-white font-bold py-2 px-4 rounded">
                  Build My CV
                </button>
              </div>
            </div>
  
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/1201512958/photo/women-freelancer-connecting-to-wireless-via-laptop.jpg?s=612x612&w=0&k=20&c=FlFIl-Oxo_DABuBI_I90653a41YNAOnCrrKnAbXAqOE="
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Register your CV</h3>
                <p className="text-gray-600 mb-6">
                  Upload your CV today to be headhunted by the UK's top companies.
                  and get a nice email when you're contacted.
                </p>
                <button className="bg-[#002244] hover:bg-[#1a3857] text-white font-bold py-2 px-4 rounded">
                  Register now
                </button>
              </div>
            </div>
  
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/1453236908/photo/businessman-audit-documents-quality-assessment-management-with-a-checklist-business-document.jpg?s=612x612&w=0&k=20&c=afK5bHSSD2_iuV3sLAd9R_NeCPN7SbLP8GqrU90gh1w="
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Career advice</h3>
                <p className="text-gray-600 mb-8">
                  Career tips, including salary guides, tax calculators and
                  interview advice, helping you get your next job.
                </p>
                <button className="bg-[#002244] hover:bg-[#1a3857] text-white font-bold py-2 px-4 rounded">
                  View career advice
                </button>
              </div>
            </div>
  
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/1594199834/photo/global-business-globe-with-network-connection-social-network-communication-businessman-with.jpg?s=612x612&w=0&k=20&c=5y2cjV3m_D3RPNkKviY_E5AiMsY1QjB_i2v_o5eTgWI="
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Company Alerts</h3>
                <p className="text-gray-600 mb-4">
                  Follow your favourite companies and receive instant email alerts
                  when they post new jobs.
                </p>
                <button className="bg-[#002244] hover:bg-[#1a3857] text-white font-bold py-2 px-4 rounded">
                  Search companies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }