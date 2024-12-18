import { Link } from 'react-router-dom';



const footer = [
  {
    title: 'Meaningby.com',
    links: [
      { name: 'New Words', link: '/word' },
      { name: 'Help', link: '/' },
      { name: 'In Print Word of the Year 2021', link: '#' },
      { name: 'Word of the Year 2022', link: '#' },
      { name: 'Word of the Year 2023', link: '#' },
      { name: 'Develop Dictionary', link: '#' },
    ],
  },
  {
    title: 'Contact Us',
    links: [
      { name: '', link: '#' },
      { name: '', link: '#' },
      { name: '', link: '#' },
      { name: '', link: '#' },
    ],
  }, {
    title: 'Navigation',
    links: [
      { name: '', link: '#' },
      { name: '', link: '#' },
      { name: '', link: '#' },
      { name: '', link: '#' },
    ],
  }, {
    title: 'Follow us',
    links: [
      { name: '', link: '#' },
      { name: '', link: '#' },
      { name: '', link: '#' },
    ],
  }]



const Footer = () => {

  const current = new Date();
  const year = `${current.getFullYear()}`;



  return (
    <>
      <footer className="w-full border-t font-sans tracking-wide bg-var(--main_color) p-2"
        style={{
          backgroundColor: 'var(--main_color)',
        }}
      >
        <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-8  justify-center text-center sm:text-left">
          {footer.map((footerItem, index) => (
            <div key={index} className='lst'>
              <h4 className="font-semibold text-xl m-0 uppercase items-center flex justify-center py-3" style={{
                color: 'var(--text_color)',
              }}> {footerItem.title} </h4> <hr className='border-[white] m-0 p-0' />
              <ul className="lstul space-y-5">
                {footerItem.links.map((link, linkIndex) => (

                  <li key={linkIndex}>
                    <Link to={link.link} className="text-[15px] text-decoration-none font-bold" style={{
                      color: 'var(--text_color)',
                    }}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

      </footer>
      <div className="border-t text-center  p-4" style={{
        backgroundColor: 'var(--main_bg)',
      }}>
        <p className="text-slate-700 font-bold m-0 items-center justify-center flex gap-1 " style={{
          color: 'var(--main_color)',
        }}>
          <span className='text-2xl text-center'> &copy;</span> {year} | MeaningBy. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;