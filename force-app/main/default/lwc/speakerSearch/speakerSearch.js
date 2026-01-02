import { track,api,LightningElement } from 'lwc';
import searchSpeaker from '@salesforce/apex/SearchSpeakerController.searchSpeaker';

export default class SpeakerSearch extends LightningElement {
    @api recordId;
    name = '' ;
    specialty='';

    @track speakerList = [];

    handleNameSearch(event)
    {
        this.name = event.target.value;
    }
    handleSpecialityChange(event)
    {
        this.specialty= event.target.value;
    }
    specialityOptions=[ { label: 'Apex', value: 'Apex' },
                        { label: 'LWC', value: 'LWC' },
                        { label: 'Integrations', value: 'Integrations' },
                        { label: 'Architecture', value: 'Architecture' }];
    handleSearch()
    {
        searchSpeaker({name:this.name , specialty:this.specialty})
        .then(result=>{
            this.speakerList= result;
            this.error= undefined;
        })
        .catch(error=>
        {
            this.error= error;
            this.speakerList= undefined;
        }
        )
    }
}