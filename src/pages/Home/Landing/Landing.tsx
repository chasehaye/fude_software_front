import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center w-full">
      <div className="border-2 border-edge p-8 md:p-16 max-w-2xl w-full text-center space-y-8 uppercase">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
          Fude<span className="hidden sm:inline">_</span>
          <span className="sm:hidden">
            <br />
          </span>
          Software
        </h1>

        <p className="text-edge text-sm md:text-base leading-relaxed tracking-tight max-w-xl mx-auto">
          Enterprise-grade communication relay. <br />
          Integrated inbound/outbound mail relay with zero-trust session
          integrity. <br />
          Automated triage for inquiries and broadcast distribution management.
          <br />
        </p>

        <Link
          to="/auth"
          className="break-all inline-block text-white w-full md:w-auto border-2 border-white px-12 py-4 text-xl font-bold hover:bg-white hover:text-black transition-all duration-300 text-center"
        >
          AUTHENTICATE
        </Link>
      </div>

      <div className="absolute bottom-8 w-full px-10 flex justify-between text-[10px] text-edge tracking-[0.3em] opacity-50 hidden lg:flex">
        <span>OS: ARCH_LINUX_KERNEL_HARDENED</span>
        <span>TUNNEL: CLOUDFLARE_ARGO_STABLE</span>
        <span>LOC: {window.location.hostname.toUpperCase()}</span>
        <span>EDGE_ENC: CHACHA20_POLY1305</span>
        <span>PROTO: HTTP_ONLY_SECURE</span>
      </div>
    </div>
  );
}

export default Landing;
