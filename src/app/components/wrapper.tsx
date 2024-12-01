interface WrapperProps {
  nav?: React.ElementType; // or ReactNode if you're passing entire components as children
  header?: React.ElementType;
  footer?: React.ElementType;
  sidebar?: React.ElementType;
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({
  nav: NavBar,
  header: Header,
  footer: Footer,
  sidebar: Sidebar,
  children,
}) => {
  return (
    <div>
      {NavBar && <NavBar />}
      {Header && <Header />}
      <div className='flex flex-col md:flex-row'>
        {Sidebar && (
          <div className='md:w-1/6 w-full'>
            <Sidebar />
          </div>
        )}
        <main className='flex-1'>{children}</main>
      </div>

      {Footer && <Footer />}
    </div>
  );
};

export default Wrapper;
