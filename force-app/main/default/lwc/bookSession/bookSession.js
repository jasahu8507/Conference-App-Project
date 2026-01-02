import { track,api,wire,LightningElement } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import getSpeaker from '@salesforce/apex/SearchSpeakerController.getSpeaker';
import Speaker_Message_Channel from '@salesforce/messageChannel/SpeakerMessageChannel__c';
import getSessions from '@salesforce/apex/SearchSpeakerController.getSessions';
import checkAvailability from '@salesforce/apex/SearchSpeakerController.checkAvailability';
import createAssignment from '@salesforce/apex/SearchSpeakerController.createAssignment';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class BookSession extends LightningElement {

    subscription = null;
    Session_Date__c;
    speakerId;
    speaker;
    isAvailable;
    selectedDate;
    @api sessionId;
    @track sessions=[];
    selectedSessionId ;
    @track sessionOptions=[];
    showCreateButton = false;
    @wire(MessageContext)
    messageContext;
// subscribe the LMS channel   
    subscriptionmethod(){
        this.subscription = subscribe(
            this.messageContext,
            Speaker_Message_Channel,
            (payload) => { this.speakerId = payload.speakerId;
                this.handleMessage()
            });
        }        
    connectedCallback()
    {   
        this.subscriptionmethod();
        this.loadSessions();
    }    
// get all the speaker details     
    handleMessage(){
        getSpeaker({speakerId : this.speakerId})
        .then(result => {
            this.speaker = result;
            this.error = undefined;
        })
        .catch(error => {
            this.error= error;
            this.speaker=  undefined;
        })
        console.log('speaker is ' , this.speakerId);
    }
// get all the session available in an object    
    loadSessions() {
        getSessions()
            .then(result => {
                this.sessions = result;
                this.sessionOptions = result.map(sess => ({
                    label: `${sess.Name} (${sess.Session_Date__c})`,
                    value: sess.Id
                }));
            });
    }
    handleSessionChange(event)
    {
        this.selectedSessionId = event.target.value;
    }
// Show toast event method    
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
//method for checking the dates entered by the user    
    handleDateChange(event)
    {
        this.selectedDate = event.target.value;
        const today = new Date().toISOString().split('T')[0];
        if(this.selectedDate <=  today)
        {
            this.showToast('Error', 'Date must be in the future', 'error');
            return;
        } 
// check the availability for selected date and session        
    checkAvailability({speakerId:this.speakerId, sessionDate: this.selectedDate})
        .then(result => {
        this.isAvailable = result;
        this.showCreateButton = result;
        if (!result) {
        this.showToast('Error','Slot is already booked, try another date','error');
            }
        })
    } 
// create assignment for speaker and session      
    handleBookSession()
    {
        createAssignment({speakerId: this.speakerId , sessionId:this.selectedSessionId })
        .then(() => {
            this.showToast(
                'Success',
                'Speaker assigned successfully',
                'success'
            );
            console.log('SpeakerId:', this.speakerId);
            console.log('SessionId:', this.selectedSessionId);
            this.showCreateButton = false;
        })
        .catch(error => {
            console.error(error);
            this.showToast('Error', 'Session is already booked for another date', 'error');
            console.log('SpeakerId:', this.speakerId);
            console.log('SessionId:', this.selectedSessionId);
        });
        this.pageRefresh();
    }
// method for refresh the page  booking session  
    pageRefresh() {
    this.selectedDate = null;
    this.selectedSessionId = null;

    this.speakerId = null;
    this.speaker = null;

    this.isAvailable = false;
    this.showCreateButton = false;
    }
}