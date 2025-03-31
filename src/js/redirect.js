const redirect = (paidTitles,title, id, navigate) => {
    // const navigate = useNavigate()
    if(paidTitles.includes(title)) {
      navigate(`store/play/${title}?q=${id}`)
    } else {
      navigate(`store/${title}?q=${id}`)
    }
  }
export default redirect;