describe('Events', function() {
  describe('EventsController', function() {
    beforeEach(module('app.core'));
    beforeEach(module('app.events'));

    var eventsService;

    beforeEach(inject(function(_eventsService_) {
      eventsService = _eventsService_;
    }));

    it('should have a eventsService', function() {
      expect(eventsService).toBeDefined();
    });

  });
});