import React, { useEffect, useRef, useState } from "react";
import { FaLongArrowAltDown as Download } from "react-icons/fa";
import Layout from "../layout/Layout"
import { MdOutlineLiveTv as Tv } from "react-icons/md";
import { RiMovie2AiFill as Movie } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle as User} from "react-icons/fa";
import { AiFillLike as Like } from "react-icons/ai";
import { FaCommentDots as Comment } from "react-icons/fa";
import api from "../js/api";
import Loader from "../boilerplates/Loader";
import { config as configurer } from "../js/api";
import { BarLoader as Spinner } from "react-spinners";
import useDownloader from 'react-use-downloader';
// import { FaDownload as Download } from "react-icons/fa";
import { FaDisplay as Ply} from "react-icons/fa6";
const App = () => {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
  useDownloader();
  const [downloading, setDownloading] = useState(false)
  const [downloadingUrl, setDownloadingUrl] = useState([])
  // console.log(error, percentage,size)
  const [spinner, setSpinner] = useState(false)
  const commentRef = useRef(null)
  const playVideo = useRef(null)
  const [videoDetails, setVideoDetails] = useState({})
  const [scroll, setScroll] = useState(false)
  const [video, setVideo] = useState({})
   const [isLoading, setIsLoading] = useState(true)
   const [videoLoaded, setVideoLoaded] = useState(false)
   const [videolength, setvideolength] =  useState('0.0.0')
   const navigate = useNavigate()
   const [paidVideo, setPaidVideos] = useState([])
  const[changer, setChanger] = useState("")
  const [liked, setLiked] = useState(false)
  const [switching, setSwitching] = useState(false)
  const [source, setSource] = useState("")
  const [formData, setFormData] = useState({
    rate: 0,
    comment: ""
  })
  
  if (scroll && commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      // console.log(commentRef.current.scrollTop)
  } 
  const path = window.location
  const id =Number( path.search.split("=")[1])
  const title = String(path.pathname.split("/")[3]).toLowerCase()
  const capitalize = title.charAt(0).toUpperCase()
  const videoTitle = capitalize + title.substring(1)
  const [movies, setMovies] = useState(false)
  const [username, setUsername] = useState("")
  const [videos, setVideos] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)
  const [errors, setError] = useState(false)
  // console.log(videoTitle)
  useEffect(() => {
    setSwitching(true)
    window.scrollTo({top:0, left:0, behavior:"instant"})
    // setIsLoading(true)
    document.title = videoTitle
    setChanger(path)
    const authenticated = localStorage.getItem("Authenticated")
    setFormData({
      rate: 0,
      comment: ""
    })
    // console.log("tkae")
    if (authenticated) {
      // const likedVideos = localStorage.getItem('likes')
      const titles = localStorage.getItem("paid").split(",")
      // console.log(titles)
      const user = localStorage.getItem('username')
      setUsername(user)
      
      if (titles) {
        
        setPaidVideos(JSON.parse(localStorage.getItem("paidVideo")))
        const tester = title.includes("%20") ? title.split("%20").join(" ") : title
        if(true){
          setMovies(true)
          const videoDetail = sessionStorage.getItem("videodetail")
          const vide = sessionStorage.getItem("video")
          if (videoDetail) {
            // console.log(JSON.parse(videoDetail))
            if(vide) {
              setVideo(JSON.parse(vide))
              setSource(JSON.parse(vide)[0].video)
              setVideoDetails(JSON.parse(videoDetail))
              setIsLoading(false)
              setSwitching(false)
              JSON.parse(vide)[0] ?  setVideos(true) : setVideos(false)  
              setVideoUrl(JSON.parse(vide)[0].video)
            }
            // sessionStorage.removeItem("videodetail")
            // sessionStorage.removeItem("video")
          } else {
            try {
              api.get(`/videoDetails/${id}/`,configurer )
            .then(res => {
                // console.log(res.data)
                setVideoDetails(res.data)
                sessionStorage.setItem("videodetail", JSON.stringify(res.data))
                try {
                  console.log(videoTitle)
                  api.get(`/videos/?name=${videoTitle}`, configurer)
                .then(res1 => {
                    setVideo(res1.data.results)
                    setIsLoading(false)
                    setSwitching(false)
                    // console.log(res1.data)
                   res1.data.results.length > 0 ?  setVideos(true) : setVideos(false)  
                   setVideoUrl(res1.data.results[0].video)
                   setSource(res1.data.results[0].video)
                   sessionStorage.setItem("video", JSON.stringify(res1.data.results)) 
                })
                }catch(error) {
                  console.warn(error)
                    
                }
                // setIsLoading(false)
            })
            }catch(error) {
              console.warn(error)
            }
          }
        }
        } else {
          setMovies(false)
        }

    } else {
      navigate('/account/authenticate')
    }
  }, [videoTitle, changer])
 
  if(playVideo.current) {
    setTimeout(() => {
      const dur = Number(playVideo.current.duration)
      const hours = Math.floor(dur / 3600);
      const minutes = Math.floor((dur % 3600) / 60);
      const secs = Math.floor(dur % 60);
      setvideolength(`${hours}.${minutes}.${secs}`)
    }, 1000)
  }
  const handleLike = () => {
    // console.log("liked")
    // e.preventDefault()
    const data = {
      user:username,
      total_like: 1,
      video_title: videoDetails.vidId
    }
    api.post("/like/", data, configurer)
    .then(res => {
      // console.log(res.data)
      setChanger(res.data.id + 1)
      setLiked(true)
    })
  }
  // submit review
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      user:username,
      rate: formData.rate,
      comment: formData.comment,
      video_title: videoDetails.vidId
    }
    api.post("/review/", data, configurer)
    .then(res => {
      // console.log(res.data)
      setChanger(res.data.id)
    window.scrollTo(0,0)
    })
    setScroll(false)
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const downloader = (video) => {
    // console.log(video)
    if(window.confirm(`Download ${String(video.video).split("/")[5]}`)) {
      const link = document.createElement('a');
      // console.log(video.video )
      link.href = video.video
    
      link.setAttribute("target", "_blank")
      link.download = String(video.video).split("/")[5];
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
      if(playVideo.current) {
        const videoUr = playVideo.current.src;
        setVideoUrl(video.video)
        playVideo.current.addEventListener('loadeddata', () => {
          if (playVideo.current) {
            playVideo.current.play()
          }
        }, {once: true})
      
  }}
  const changeSource = (src) => {
    window.scrollTo(0, 0)
    if (playVideo.current) {
        playVideo.current.src = src
        playVideo.current.play()
    }
    // console.log(src)
    setSource(src)
    
}
  const changevid = async(title, id) => {
    window.scrollTo(0,0)
    setSpinner(true)
    api.get(`/videoDetails/${id}/`,configurer )
            .then(res => {
                // console.log(res.data)
                setVideoDetails(res.data)
                try {
                  console.log(videoTitle)
                  api.get(`/videos/?name=${title}`, configurer)
                .then(res1 => {
                    setVideo(res1.data.results)
                    setIsLoading(false)
                    setSwitching(false)
                    // console.log(res1.data)
                   res1.data.results.length > 0 ?  setVideos(true) : setVideos(false)  
                   setVideoUrl(res1.data.results[0].video)
                   setSource(res1.data.results[0].video)
                   setSpinner(false)
                })
                }catch(error) {
                  console.warn(error)
                    
                }
                // setIsLoading(false)
            })
  }
  return (
    <Layout>
       <div className='fixed top-0 left-0 w-full z-30'>
        <Spinner
          color="rgba(255,255,255,0.5)"
          // backgroundColor="black"
          loading={spinner}
          cssOverride={{
            "width": "100%",
            "backgroundColor": "transparent"
          }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <main className="bg-black p-2 play">
        {movies ? <>
          {isLoading & !videoLoaded ? <div>
        <div>
            {/* title and season */}
            <div className='p-4'>
                <Loader h1='h-7 w-32' h2=''/>
                <Loader h2='h-7 w-32' h1=''/>
            </div>
            {/*  */}
            <div className='grid grid-cols-2 gap-4 my-3 md:w-4/5 mx-auto lg:w-full'>
                {/* img add cart purchase */}
                <div>
                    <Loader h1='h-32' h2=''/>
                    <Loader h2='h-7' h1=''/>
                    <Loader h2='h-7' h1=''/>
                </div>
                <div className='mx-2'>
                    {/* like */}
                    <div className='grid grid-cols-2 gap-2 items-start'>
                        <Loader h1='h-7' h2=''/>
                        <Loader h2='h-7' h1=''/>
                    </div>
                    {/* rate */}
                    <div className='grid grid-cols-2 gap-2 items-start'>
                        <Loader  h1='h-7' h2=''/>
                        <Loader h2='h-7' h1=''/>
                    </div>
                    {/* price */}
                    <div className='grid grid-cols-2 gap-2 items-start'>
                        <Loader h1='h-7' h2=''/>
                        <Loader h2='h-7' h1=''/>
                    </div>
                </div>
            </div>
        </div>
        {/* synopis */}
        <div className='w-5/6 m-auto my-2 '>
            <Loader h1='h-7' h2=''/>
            <Loader h2='h-32' h1=''/>
        </div>
        {/* comment */}
        <div className='bg-slate-600 bg-opacity-40 p-3 rounded-md '>
            <Loader h1='h-7' h2=''/>
            <div className='grid grid-cols-3 gap-3'>
                <Loader h2='h-32' h1=''/>
                <Loader h2='h-32' h1=''/>
                <Loader h2='h-32' h1=''/>
            </div>
        </div>
     </div> : <div className="xl:w-5/6 m-auto">
          <div className="lg:grid grid-cols-5 gap-4 lg:m-3 xl:grid-cols-6 2xl:grid-cols-7">
            <div className="video-container col-span-5 ">
              {
                videos ? <video id="myVideo" ref={playVideo} poster={require(videoDetails.image)} src={require(videoUrl)}  controls controlsList="nodownload nopictureinpicture" autoPlay muted>
            </video> : <p className="text-white">No Videos by that name</p>
              }
            <div className="flex items-start justify-between text-white">
              <div>
                <p className="text-sm font-bold capitalize">{videoDetails.title}</p>
                <div className="textSm flex gap-2 items-start">
                  <Tv/>
                  <p>{videoDetails.cartegory}</p>
                  <p>/</p>
                  <p>{videoDetails.typs}</p>
                  <p>kes.{videoDetails.price}</p>
                </div>
              </div>
              {/* like and comment */}
              <div className="flex items-start gap-3 mr-2">
                {/* like */}
                <div onClick={handleLike}>
                  {!liked ? <Like size={20}/> :
                  <Like size={20} className="text-green-600"/>}
                  <p className="textSm text-white text-opacity-80">{videoDetails.likes.length}</p>
                </div>
                <div onClick={() => {
                  // console.log("clocked")
                  scroll ? setScroll(false):setScroll(true)
                }}>
                  <Comment size={20}/>
                  <p className="textSm text-white text-opacity-80">{videoDetails.reviews.length}</p>
                </div>
              </div>
            </div>
            </div>
          {/* video deails */}
            <div className="text-white bg-slate-700 bg-opacity-30  p-3 col-span-2">
          
            {/* download option */}
            <div className="mt-5">
              <p className="text-sm capitalize font-mono font-bold  text-white text-opacity-90">Download Resources</p>
              <div className="md:grid grid-cols-3 gap-3 md:my-3 lg:block">
                {
                  video.map((vid, index) => (
                    <div  className="bg-white block bg-opacity-10 rounded-md my-2 md:m-0 lg:my-2 p-3" key={index}>
                  <div className="flex flex-wrap items-center justify-between">
                      <div className="grid w-full overflow-hidden">
                         
                          <p className="textMidSm max-w-full capitalize whitespace-normal pb-1 font-bold">{String(vid.video).split("/")[5]}</p>
                        <div className="flex uppercase gap-3 textMidSm text-gray-300">
                          <p>{vid.size}</p>
                          <p>{videolength}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 my-2 flex-wrap">
                        <div>
                        {downloading && downloadingUrl.includes(vid.video) ? <button className='textSm font-bold flex gap-1 items-center bg-green-900 text-white rounded-lg p-2 hover:bg-green-800 w-fit' >
                          <p>Downloading : {percentage}%</p>
                          <p>{size / (1024 * 1024)}MB</p>
                          </button> : 
                          <button onClick={() => 
                           { 
                            setDownloading(true)
                            setDownloadingUrl(downloadingUrl => [...downloadingUrl, vid.video])
                            download(vid.video, vid.video.split("/")[5])}}  className='textSm font-bold flex gap-1 items-center bg-slate-900 text-white rounded-lg p-2 hover:bg-slate-800 w-fit' >
                                    <Download size={15} /> Download
                          </button>}
                        </div>
                        <button className='textSm font-bold flex gap-1 items-center bg-slate-900 text-white rounded-lg p-2 hover:bg-slate-800 w-fit' onClick={() => {
                                changeSource(vid.video)
                            }}>
                                    <Ply size={13} /> {source == vid.video ? "playing..." : "Play"}
                                </button>
                      </div>
                  </div>
                  <p className="flex uppercase gap-3 textSm text-gray-300 py-1 font-mono tracking-wide">Kingstonemovies.xyz</p>
                </div>
                  ))
              }
              </div>
            </div>
            {/* description */}
            <div className="my-3">
              <p className="text-sm font-bold">Synopsis</p>
              <p className="textMidSm text-gray-200 my-3">{videoDetails.synopsis}</p>
            </div>
            {/* paid videos */}
            <div>
              <p className="text-sm font-bold my-2">Also Purcharsed</p>
              <div className="grid grid-cols-3 gap-5 md:grid-cols-4  lg:grid-cols-3  2xl:grid-cols-6">
                {
                  paidVideo.map((pay, index) => (
                    <div to={`/store/play/${pay.video_name}?q=${pay.video_id}`} key={index} onClick={() => {
                      changevid(pay.video_name, pay.video_id)
                    }}>
                      <img src={require(pay.image_url)} alt="" className="imgPlay rounded-md h-5/6" />
                      <p className="textMidSm font-bold">{pay.video_name}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          </div>
          {/* comments */}
          <div className='text-white p-3 col-span-2'>
            <p className='text-center text-lg my-2'>Reviews</p>
            <div className="md:grid grid-cols-2 gap-4 md:my-4">
              {videoDetails.reviews.map((comment, index) => (
                  <div className='bg-slate-600 bg-opacity-40 p-3 rounded-md my-3 md:m-0 '  key={index}>
                  {/* user */}
                  <div className='flex py-3 items-center gap-3 text-slate-300'>
                      <User size={23}/>
                      <p>{comment.user}</p>
                  </div>
                  <div className='text-gray-400 flex'>
                      
                      <p>{comment.comment}</p>
                  </div>
              </div>
              ))}
            </div>
            {/* review */}
            <div className="bg-slate-400 bg-opacity-15 p-2 rounded-sm">
              <p className="text-center py-1" ref={commentRef}>Post Comment</p>
              <form >
                <label className="inline-block text-sm    " htmlFor="rate">Rate</label>
                <select name="rate" id="" className="bg-transparent border-gray-50 border-2 rounded-md text-sm text-gray-400 outline-none mx-2" onChange={handleChange} value={FormData.rate}>
                <option className="bg-transparent" value="0">0</option>
                  <option className="bg-transparent" value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <label htmlFor="comment" className="block mt-2">Comment</label>
                <textarea name="comment" id="comment" rows={2} className="bg-transparent outline-none border-b-slate-100 border-b-2 mb-2 w-full" value={FormData.comment} required = {true} onChange={handleChange} ></textarea>
                <button className="inline-block bg-white bg-opacity-40 p-1 textMidSm rounded-md" onClick={handleSubmit}>submit</button>
              </form>
            </div>
          </div>
        </div>}
        </> : <p className="text-white">No Videos by that name</p>}
      </main>
    </Layout>
  )
};

export default App;