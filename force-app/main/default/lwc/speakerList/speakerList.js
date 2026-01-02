
import {wire,  api, LightningElement } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import Speaker_Message_Channel from '@salesforce/messageChannel/SpeakerMessageChannel__c';

export default class SpeakerList extends LightningElement
{
    @api speakerList ;
    columns  = [{label:'Name', fieldName:'Name'},
                {label:'Email', fieldName:'Email__c'},
                {label:'Speciality', fieldName:'Speciality__c'},
                {type: 'button',
                typeAttributes: {
                    label : 'Book Session',
                    name: 'book',
                    variant: 'brand'
                    }}];

    // for handling book session button    
    @wire(MessageContext)
    messageContext;             
    handleRowAction(event)
    {
        const speakerId = event.detail.row.Id;
        console.log('book session clicked' + speakerId);
        const payload = {speakerId : speakerId};
        //publish message
        publish(this.messageContext,Speaker_Message_Channel,payload);
    }                                
}

