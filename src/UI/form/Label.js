const Label = (props) => {

    const className = props.className!=null?props.className:'form-label';

    return <>
    
    <label className={className}>{props.children}</label>
    
    </>

}

export default Label;