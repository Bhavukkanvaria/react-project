import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Accordion from './Components/accordion'
import './App.css'
import RandomColor from './Components/random-color'
import StarRating from './Components/star-ratings'
import ImageSlider from './Components/ImageSlider'
import LoadMoreData from './Components/load-more-data'
import TreeView from './Components/tree-view'
import ScrollIndicator from './Components/scroll-indicator'
import Customtabs from './Components/tab-components'
import ModalPopup from './Components/modal-popup'
import SearchAutoComplete from './Components/searchAutoComplete'
import TicTacToe from './Components/Tic-tac-toe'
import FeatureFlags from './Components/feature-flags'
import { FetchDataOnClick } from './CustomHooks/useFetchHook'
import { WindowResize } from './CustomHooks/useWindowResize'
import FoodRecipe from './Components/food-recipe-app/foodRecipe'
import { PaginationComponent } from './Components/Pagination/pagination'
import {TabComponent } from './Components/tab-form-components/tabComponent'
import { FileFolder } from './Components/file-folder/File_Folder'
import { InfiniteScroll } from './Components/InfinteScroll/InfiniteScroll'

const App = () => {
  return (
    <>
      {/* Accordion Component  */}
      <Accordion />

      {/* Random Color */}
      <RandomColor />
      
      {/* Star rating */}
      <StarRating numStars={10}></StarRating>
      
      {/* Image Slider */}
      <ImageSlider url={"https://picsum.photos/v2/list"}></ImageSlider>
      
      {/* Load more data */}
      <LoadMoreData />
      
      {/* Tree View */}
      <TreeView />
      
      {/* Scroll Indicator */}
      <ScrollIndicator />
      
      {/* Custom tabs */}
      <Customtabs />
      
      {/* Modal Popup */}
      <ModalPopup />
      
      {/* SearchAutoComplte */}
      <SearchAutoComplete />

      {/* Tic Tac Toe */}
      <TicTacToe />

      {/* FeatureFlags */}
      <FeatureFlags />

      {/* Fetch Hook */}
      <FetchDataOnClick />

      {/* Window Resize hook */}
      <WindowResize />

      {/* Food Recipe */}
      <FoodRecipe />

      {/* Pagination */}
      <PaginationComponent />

      {/* Tab Comonentt with validation */}
      <TabComponent/> 

      {/* File Folder View same as Tree View*/}
      <FileFolder />

      {/* Infinite Scroll */}
      <InfiniteScroll />

    </>
  )
}

export default App