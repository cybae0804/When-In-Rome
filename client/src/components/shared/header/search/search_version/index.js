import React from 'react';
import Calendar from '../../../calendar/calendar';
import './index.css';

export default ({
  submit, change, val, pre, filter, 
  filterOpen, filterChange, sort, clear,
  sortOpen, apply, cancel, dateOpen, view,
  calVal, calChange, openDate, sortItemHandler
}) => (
  <form id='search' className={`ui form posRelative ${view === 'desktop' ? 'desktopSearchSearch' : ''}`} onSubmit={submit}>
    <div className="ui fluid left icon input" onSubmit={submit}>
      <i className="search link icon" onClick={submit}/>
      <input 
        type="text" 
        name="cityjob" 
        placeholder="Osaka, Japan" 
        onChange={change} 
        value={val.cityjob}
      />
    </div>
    <div className={filterOpen ? 'dispNone' : 'topMargin4px'}>
      <button type='button' className="ui positive button filterButton" onClick={filter}>Filter</button>
      <button type='button' className="ui positive button sortButton" onClick={sort}>
        {val.by === null ? 'Sort by...' : 
        val.desc ? <div>Sorting by {val.by} <i className="arrow down icon"></i></div> :
        <div>Sorting by {val.by} <i className="arrow up icon"></i></div>}
      </button>
      <div className={`sortDrop shadow ${sortOpen ? '' : ' dispNone'}`}>
        <div className="space12px"></div>
        <button 
          type='button' 
          className="ui fluid button dropButton" 
          onClick={() => {sortItemHandler('price')}}
        ><span className='marginRight7px'>Price</span>{val.by === 'price' && !val.desc ? <i className="arrow down icon"/> : <i className="arrow up icon"/>}</button>
        <div className="space12px divider ui"></div>
        <button 
          type='button' 
          className="ui fluid button dropButton"
          onClick={() => {sortItemHandler('rating')}}
        ><span className='marginRight5px'>Rating</span> {val.by === 'rating' && !val.desc ? <i className="arrow down icon"/> : <i className="arrow up icon"/>}</button>
        <div className="space12px divider ui"></div>
        <button
          type='button' 
          className="ui fluid button dropButton" 
          onClick={() => {sortItemHandler('date')}}
        ><span className='marginRight5px'>Date</span> {val.by === 'date' && !val.desc ? <i className="arrow down icon"/> : <i className="arrow up icon"/>}</button>
        <div className="space12px"></div>
      </div>
    </div>
    <div className={filterOpen ? 'topMargin4px' : 'dispNone'}>
      <button 
        type='button' 
        className="ui positive button filterButton" 
        onClick={apply}
      >
        Apply
      </button>
      <button 
        type='button' 
        className="ui button sortButton" 
        onClick={cancel}
      >Cancel</button>
    </div>
    <div className={`filterDrop ${filterOpen ? '' : 'dispNone'}`}>
      <button onClick={apply} className='dispNone'></button>
      <div className='two fields'>
        <div className="field small" id="overrideColumns">
          <label>Group Size</label>
          <input 
            type="text" 
            name="guests" 
            placeholder='Number of Guests' 
            onChange={filterChange} 
          />
        </div>
        <div className="field small" id="overrideColumns">
          <label>Price</label>
          <div className="two fields">
            <div className="field small" id="overrideColumns">
              <input 
                type="text" 
                placeholder='Min' 
                name='priceMin' 
                onChange={filterChange} 
              />
            </div>
            <div className="field small" id="overrideColumns">
              <input 
                type="text" 
                placeholder='Max' 
                name='priceMax' 
                onChange={filterChange} 
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field">
        <label>Dates</label>
        <input readOnly 
          className = 'widthAdjust marginRight14px'
          type="text" 
          name="date" 
          placeholder="mm/dd/yyyy" 
          onFocus={openDate}
          value={pre.dateStart && pre.dateEnd ? `${pre.dateStart} to ${pre.dateEnd}` : ''}
        />
        <button 
            type='button' 
            className='ui button orange'
            onClick={clear}
          >Clear</button>
        <div className={dateOpen ? '' : 'dispNone'}>
          <Calendar
            selectRange 
            returnValue="range"
            value={calVal} 
            onChange={calChange}
          />
        </div>
      </div>
    </div>
    <input type="submit" className='dispNone'/>
  </form>
);
