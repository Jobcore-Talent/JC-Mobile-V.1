import { FluxStore } from '../../utils/flux-state';
import { LOG, WARN, ERROR } from "../../utils";

class InviteStore extends FluxStore {
  constructor() {
    super();

    this.addEvent('JobInvites');

    /**
     * Get invite event, parse the lat/lng to Number
     */
    this.addEvent('GetInvite', (invite) => {
      try {
        invite.shift.venue.latitude = Number(invite.shift.venue.latitude);
        invite.shift.venue.longitude = Number(invite.shift.venue.longitude);
      } catch (e) {
        LOG(this, 'Error parsing the lat/lng to Number');
      }

      return invite;
    });

    this.addEvent('ApplyJob');

    this.addEvent('RejectJob');

    this.addEvent('GetPositions');

    this.addEvent('GetJobPreferences');

    this.addEvent('EditJobPreferences');

    this.addEvent('StopReceivingInvites');

    this.addEvent('EditPositions');

    /**
     * Get availability list event, order array by starting_at date
     */
    this.addEvent('GetAvailability', (availability) => {
      if (Array.isArray(availability)) {
        availability.sort((a,b) => {
          if (a.starting_at > b.starting_at) return 1;
          if (a.starting_at < b.starting_at) return -1;
          return 0;
        });
      }

      return availability;
    });

    this.addEvent('EditAvailability');

    this.addEvent('DeleteAvailability');

    this.addEvent('InviteStoreError', nextState => {
      LOG(this, nextState);

      if (nextState.non_field_errors) {
        return nextState.non_field_errors.join(", ");
      }
      if (nextState.message) {
        return nextState.message;
      }

      return nextState;
    });
  }
}

const inviteStore = new InviteStore();

export default inviteStore;
