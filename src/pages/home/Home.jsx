import React, { useEffect, useReducer } from 'react'
import Posts from './components/posts/Posts'
import './Home.css'
import Suggestions from './components/suggestions/Suggestions'
import HomeSkeleton from './components/home-skeleton/HomeSkeleton'
import { getFeed } from '../../services/FeedService'
import { feedReducer, initialFeedState } from '../../reducers/FeedReducer'
import { toast } from 'react-toastify'
const Home = () => {
  const[state,dispatch]=useReducer(feedReducer,initialFeedState);
  const{feedList,loading}=state;
  useEffect(() => { 
  const fetchFeed=async()=>{
    try {
      dispatch({type:'START_LOADING'})
      const feed=await getFeed();
      dispatch({type:'SET_FEED',payload:feed});
      console.log(feed);
    } catch (error) {
      toast.error('Unable to Load feed')
    }
    finally{
      dispatch({type:'STOP_LOADING'})
    }

  }
  fetchFeed();
    
  }, [])
  
  return (
    <div className='app-pages' id='home-page'>
         {loading?<HomeSkeleton/>:<>
          <Posts feedList={feedList}/>
          <Suggestions/>
         </>
         }
    </div>
  )
}

export default Home

