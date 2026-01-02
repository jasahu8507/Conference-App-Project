
public with sharing class SearchSpeakerController { 
    @AuraEnabled
    public static List<Speaker__c> searchSpeaker(String name , String specialty) {
    String strNameLike = '%' + name + '%';
    String strSpecialityLike = '%' + specialty + '%';
    return [SELECT Id, Name, Email__c, Speciality__c FROM Speaker__c WHERE Name LIKE :strNameLike AND Speciality__c LIKE :strSpecialityLike ];
    }
// get speaker details from speaker object (used in right section -book session)   
    @AuraEnabled
    public static Speaker__c getSpeaker(Id speakerId) {
    return [SELECT Id, Name, Email__c, Speciality__c  , Bio__c FROM Speaker__c WHERE Id = :speakerId LIMIT 1];
    }

//check availibility for selected date 
    @AuraEnabled
    public static Boolean checkAvailability(Id speakerId, Date sessionDate) {
        Integer countAssignments = [
            SELECT COUNT()
            FROM Speaker_Assignment__c
            WHERE Speaker__c = :speakerId
            AND Session__r.Session_Date__c = :sessionDate
        ];
        return countAssignments == 0;
    }

// create assignment based on speaker Id and session Id
    @AuraEnabled
    public static void createAssignment(Id speakerId, Id sessionId) {
        insert new Speaker_Assignment__c(
            Speaker__c = speakerId,
            Session__c = sessionId
        );
    }
    
// get sessions details
    @AuraEnabled
    public static List<Session__c> getSessions() {
        return [
            SELECT Id, Name, Session_Date__c
            FROM Session__c
            WHERE Session_Date__c >= TODAY
            ORDER BY Session_Date__c
        ];
    }
}