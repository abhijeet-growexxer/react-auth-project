import { Modal, Header, Button, Icon } from "semantic-ui-react";
import { useState, useEffect } from "react";
const AlertModal = ({ isOpen, header}) => {
    const [open, setOpen] = useState(false);
    useEffect(() => { 
        if (isOpen) { 
            setOpen(true)
        }
    },[isOpen])
    return (
        <>
            { open ? (<Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={true}
            size='small'
        >
                <Header icon>
                    <Icon name='checkmark circular' color="green"  />
                    { header}
                    <Header.Subheader content="Refresh the page to see the changes" />
                </Header>
                <Modal.Actions>
                    <Button  color="black"  onClick={() => setOpen(false)} content="Ok" />
                </Modal.Actions>
            </Modal>): null}
        </>
    )
}
export default AlertModal;