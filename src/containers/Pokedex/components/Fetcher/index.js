import React from 'react'
import classes from './styles.css'
import RaisedButton from 'material-ui/RaisedButton'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import Stop from 'material-ui/svg-icons/av/stop'
import Clear from 'material-ui/svg-icons/content/clear'
import Loader from 'react-loader'


const Fetcher = ({...props})=>{
    const {
        clearLocalStorage,
        startFetching,
        stopFetching,
        fetching
    } = props
    const {
        container,
        loaderContainer
    } = classes
    return (
        <div className={container}>
            <div
                className={loaderContainer}
                >
                <Loader loaded={!fetching}/>
            </div>
            <RaisedButton
                disabled={fetching}
                style={{marginRight:'10px'}}
                onClick={startFetching}
                label='Start fetching'
                icon={<FileDownload/>}
            />
            <RaisedButton
                disabled={!fetching}
                style={{marginRight:'10px'}}
                onClick={stopFetching}
                label='Stop fetching'
                icon={<Stop/>}
            />

            <RaisedButton
                style={{marginRight:'10px'}}
                onClick={clearLocalStorage}
                label='Clear local storage'
                icon={<Clear/>}
            />

        </div>
    )
}
Fetcher.propTypes = {

}
export default Fetcher
