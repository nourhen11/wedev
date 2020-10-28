import React, {useState, useRef} from 'react'


function DragnDrop({data}) {
    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();
    const handleDragStart = (e, params) => {
        console.log('drag start ..', params)
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
                setDragging(true)
            }, 0
        )
    }

    const handleDragEnter = (e, params) => {
        console.log('enterring drag', params)
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            console.log("target is not the same")
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0])
                dragItem.current = params
                return newList
            })
        }
    }
    const handleDragEnd = () => {
        console.log('Ending drag...')

        setDragging(false)

        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;
    }
    const getStyles = (params) => {
        let currentItem = dragItem.current;
        if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
            return 'current card'
        }
        return 'card'
    }
    return (
        <div className="drag-n-drop">
            {list.map((grp, grpI) => (
                <div key={grp.title} className="dnd-group"/*onDragEnter={dragging && !grp.items.lenght?(e) => handleDragEnter(e, {grpI, itemI: 0}):null }*/>
                    <div className="group-title">{grp.title}
                        <button className="button-add">+</button>
                    </div>
                    {grp.items.map((item, itemI) => (
                        <div
                            draggable
                            onDragStart={(e) => {
                                handleDragStart(e, {grpI, itemI})
                            }}
                            onDragEnter={dragging ? (e) => {
                                handleDragEnter(e, {grpI, itemI})
                            } : null}
                            key={item}
                            className={dragging ? getStyles({grpI, itemI}) : "card"}>
                            <div className="card-header">
                                <i className="fas fa-ellipsis-h"></i>
                            </div>
                            <div className="card-body">
                                {item}
                            </div>

                        </div>
                    ))}
                    <button type="button" className="btn btn-flat btn-lg">+ Créer un Ticket</button>

                </div>

            ))}
        </div>
    )
}

export default DragnDrop;