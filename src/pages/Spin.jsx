import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Wheel } from 'react-custom-roulette'
import { FcRules as Rules} from "react-icons/fc";
import { NavLink, useNavigate } from 'react-router-dom';
import { RxSpeakerModerate as Volume } from "react-icons/rx";
import { RxSpeakerOff as Muted } from "react-icons/rx";
import Loader from '../boilerplates/Loader';
import { config as configurer } from '../js/api';
import api from '../js/api';
const data = [
    { option: '150', style: { backgroundColor: '#FFD700', textColor: '#000000' } }, // Gold
    { option: '100', style: { backgroundColor: '#FF69B4', textColor: '#FFFFFF' } },   // Hot Pink
    { option: '50', style: { backgroundColor: '#00CED1', textColor: '#FFFFFF' } },  // Dark Turquoise
    { option: '20', style: { backgroundColor: '#9370DB', textColor: '#FFFFFF' } },   // Medium Purple
    { option: '12', style: { backgroundColor: '#32CD32', textColor: '#000000' } },  // Lime Green
    { option: '8', style: { backgroundColor: '#FFA07A', textColor: '#000000' } }, // Light Salmon
    { option: '5', style: { backgroundColor: '#483D8B', textColor: '#FFFFFF' } },   // Dark Slate Blue
    { option: '3', style: { backgroundColor: '#00BFFF', textColor: '#FFFFFF' } }, // Deep Sky Blue
    { option: '1', style: { backgroundColor: '#FF4500', textColor: '#FFFFFF' } },   // OrangeRed
    { option: '0', style: { backgroundColor: '#8B008B', textColor: '#FFFFFF' } },  // Dark Magenta
  ];
const Spin = () => {
	const [online, setOnline] = useState(navigator.onLine)
	const [isLoading, setIsLoading] = useState(true)
	const [startIndex, setStartIndex] = useState(9)
  const [mute, setMute] = useState(true)
  const [result, setResult] = useState(null)  
  const spinnerRef = useRef(null)
  const overRef = useRef(null)
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
	const [userDate, setUserData] = useState({})
	const [userProfile, setUserProfile] = useState({})
	const navigate = useNavigate()
	const [error, setError] = useState("")
  const handleSpinClick =async () => {
		if (online) {
			if (userProfile.account >= 10) {
				const newPrizeNumber = generatePrizeNumber()
				try {
					const res = await api.patch(`/profile/${userProfile.buyerid}/`, {account: (userProfile.account - 10)}, configurer)
					setUserProfile(res.data)
					// console.log(res.data)
					// console.log(res2.data)
					setResult(null)
					setPrizeNumber(newPrizeNumber);
					setMustSpin(true);
					if(spinnerRef.current) {
							spinnerRef.current.play()
					}
				} catch(error) {
					setError("Unable to process your accounts details.")
				}
			} else {
					setError(`Your account balance is low! Balance Kes ${userProfile.account}`)
			}
		}else {
			setError("No Network!")
		}
	}
  const generatePrizeNumber = () => {
    const randomNumber = Math.random();
    const frequencies = [0.001, 0.005, 0.001, 0.01, 0.2, 0.15, 0.2, 0.1, 0.08, 0.144]; // Frequencies
    let cumulativeFrequency = 0;

    for (let i = 0; i < frequencies.length; i++) {
      cumulativeFrequency += frequencies[i];
      if (randomNumber <= cumulativeFrequency) {
        return i;
      }
    }
    return 9; // Default to Total Loss if something goes wrong.
  };
  const handleStopSpinning = async () => {
		setStartIndex(data.indexOf(data[prizeNumber]))
    setMustSpin(false);
    spinnerRef.current.pause()
    if(overRef.current) {
        overRef.current.play()
    }
		try {
			const res2 = await api.post("/betting/",configurer, {
				win: Number(data[prizeNumber].option),
				profile: userProfile.buyerid,
				username: userProfile.username
			})
		} catch(error) {
			api.post("/errors/", {
				user: userProfile.buyerid,
				error_details: "Unable to update betting records for this user."
			}, configurer)
			.then(res => {
				console.log(res.data)
			})
		}
		try {
			const res3 = await api.patch(`/profile/${userProfile.buyerid}/`, {account: userProfile.account + Number(data[prizeNumber].option)}, configurer)
			setUserProfile(res3.data)
		} catch(error) {
			api.post("/errors/", configurer, {
				user: userProfile.buyerid,
				error_details: `User won ${data[prizeNumber].option}, but never got added to account`
			})
			.then(res => {
				console.log(res.data)
			})
		}
		// console.log(res3.data)
		// console.log(data.indexOf(data[prizeNumber]))
    setResult(data[prizeNumber].option)
  };
  const authenticator = async (config) => {
        try {
            const res = await api.get("/info/", config)
            const dataProfile = res.data
            setUserData(dataProfile)
            // console.log(dataProfile.profile)
						setUserProfile(dataProfile.profile)
            document.title = `${dataProfile.username} | Account`
            setIsLoading(false)
					} catch {
            navigate('/account/authenticate')
						setIsLoading(false)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("access_token")
				// console.log(token)
        if(token) {
            const config = {
                headers : {
                "Authorization" : `Bearer ${token}`
                }
            }
           authenticator(config)                    
        } else {
            navigate('/account/authenticate')
        }
    }, [])
		useEffect(() => {
			// Add event listener for online event
			window.addEventListener('online', (event) => {
				setOnline(true)
				setError("")
			});

			// Add event listener for offline event
			window.addEventListener('offline', (event) => {
				setOnline(false)
				setError("No newtork")
			});
		},[])
		function convertTimestampToDateTime(timestampString) {
      const date = new Date(timestampString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
    
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  return (
    <div className='w-full '>
        <header className='bg-slate-700 text-gray-100 p-2 sticky
         top-0 left-0 z-10'>
            <h1 className='text-center p-2 font-bold tracking-wide'>Kingstonemovies</h1>
            <nav className='flex justify-evenly text-sm font-mono text-sky-300'>
                <NavLink to="/">View Site</NavLink>
                <NavLink to="/account">Account</NavLink>
                <NavLink to="/store">Store</NavLink>
            </nav>
        </header>
{/* error */}
				{error ? <div className='fixed top-0 right-0 ml-4 z-10 w-fit  bg-red-600 p-2 font-bold text-white rounded-md'>
						<p className='text-sm  '>{error}</p>
				</div> : null}
        <div className='bg-amber-700 mb-3 p-2 overflow-x-hidden' style={{ width: '100%', overflow: 'hidden' }}>
        <div className=''
            style={{
            whiteSpace: 'nowrap',
            animation: 'scrollText 20s linear infinite',
            }}
        >
            <p className='text-sky-300 font-bold font-mono'>Spin for vibrant wins! Thrill mounts. Play smart, set limits. Enjoy the game responsibly.</p>
        </div>
      </div>
     <div className='lg:grid lg:grid-cols-3 gap-5'>
        <div className='col-span-2'>
            <div className=' p-2'>
                <p className='flex gap-2 text-center font-bold'> <Rules className='block' size={20}/> Rules</p>
                <div className='text-sm '>
                    <p>- Each spin cost kes 10.</p>
                    <p>- If a win is not credited, contact our team.</p>
                </div>

            </div>
        <div className='grid place-content-center m-3 shadow-md shadow-gray-500 rounded-sm p-2 w-11/12 overflow-hidden hover:cursor-pointer mx-auto'>
            <div className='shadow-md shadow-amber-900 w-fit p-1 ' onClick={() => {
                mustSpin ? null : mute ? setMute(false) : setMute(true)
            }}>
                {mute ? <span className='flex items-center gap-2 textMidSm '><Muted/> click to unmute</span>:<span className='flex items-center gap-2 textMidSm '><Volume/> click to mute</span>}
            </div>
            <Wheel
                mustStartSpinning={mustSpin}
                outerBorderColor='skyblue'
                prizeNumber={prizeNumber}
                data={data}
                textColors={["white"]}
                fontSize={25}
                innerRadius={10}
                fontWeight={"bold"}
                perpendicularText={true}
                disableInitialAnimation={true}
                spinDuration={1}
                startingOptionIndex={startIndex}
                innerBorderWidth={10}
                innerBorderColor='skyblue'
                outerBorderWidth={10}
                radiusLineColor='white'
                radiusLineWidth={6}
                onStopSpinning={handleStopSpinning}
            />
            <p className='text-center'>{result !== null ? `You have won!: Kes.${result}` : null}</p>
        </div>
        <div className='grid place-content-center'>
            <button onClick={handleSpinClick} className='inline-block bg-blue-600 text-sm p-3 rounded-md text-white font-bold' disabled={mustSpin}>{mustSpin ? "Spinning..." : "spin"}</button>
        </div>
        <div>
            <audio src={require("../assets/music/over.mp3")} ref={overRef} muted={mute}></audio>
            <audio muted={mute} src={require("../assets/music/spinner.mp3")} loop ref={spinnerRef}></audio>
        </div>
        </div>      
        <div className='mt-2 p-3'>
            {/* records */}
            <p className='text-center'>Your winning Record</p>
            <div className='grid gap-3' style={{
                maxHeight: "60vh",
                overflowY: "scroll"
            }}>

                {isLoading ? <Loader/> : userProfile.betting_record.length <= 0 ? <p>No records yet</p> : userProfile.betting_record.sort((a, b) => {
										const nameA = a.betting_date.toUpperCase(); 
										const nameB = b.betting_date.toUpperCase(); 
										if (nameB < nameA) {
											return -1; 
										}
										if (nameB > nameA) {
											return 1; 
										}
										return 0; 
									}).map((data, index) => (
                    <div className='shadow-sm shadow-sky-700 p-2 rounded-md' key={index}>
                    <p className='text-sm font-mono font-bold'>{convertTimestampToDateTime(data.betting_date)}</p>
                    <p className='font-serif tracking-wide'>Won: Kes.{data.win}</p>
                </div>
                ))}
            </div>
        </div>
     </div>
    </div>
  )
}

export default Spin
