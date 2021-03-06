// Generated by CoffeeScript 1.4.0
(function() {

  describe('Loudmouth', function() {
    describe('#complainLoudly', function() {
      it('should show complaints via an alert', function() {
        var alert_stub;
        alert_stub = sinon.stub(window, 'alert');
        Loudmouth.addError('error-message', 'error-url', 'error-line-number');
        Loudmouth.complainLoudly();
        assert(alert_stub.called);
        return window.alert.restore();
      });
      it('should indicate if there was more than one exception', function() {
        var alert_stub;
        alert_stub = sinon.stub(window, 'alert');
        Loudmouth.addError('error-message', 'error-url', 'error-line-number');
        Loudmouth.addError('error-message', 'error-url', 'error-line-number');
        Loudmouth.complainLoudly();
        sinon.assert.calledWith(alert_stub, sinon.match(/2 JavaScript exceptions/));
        return window.alert.restore();
      });
      return it('should say there are no complaints', function() {
        var logger_spy;
        logger_spy = sinon.spy(Loudmouth, 'logger');
        Loudmouth.complainLoudly();
        assert(logger_spy.called);
        return Loudmouth.logger.restore();
      });
    });
    describe('#captureAlerts', function() {
      it('should tell you that alerts are being captured');
      it('should capture alerts');
      it('should show the alert');
      return it('should return the Loudmouth object');
    });
    describe('#complainSilently', function() {
      var hollaback_stub;
      hollaback_stub = null;
      before(function() {
        return hollaback_stub = sinon.stub(Loudmouth, 'hollaback');
      });
      beforeEach(function() {
        return hollaback_stub.reset();
      });
      after(function() {
        return Loudmouth.hollaback.restore();
      });
      it('should hollaback complaints', function() {
        Loudmouth.addError('error-message', 'error-url', 'error-line-number');
        Loudmouth.complainSilently();
        return assert(hollaback_stub.called);
      });
      return it('should do nothing if there are no complaints', function() {
        Loudmouth.complainSilently();
        return assert(!hollaback_stub.called);
      });
    });
    describe('#hollaback', function() {
      it('should send error information');
      return it('should warn if there is no hollaback URL', function() {
        var logger_stub;
        Loudmouth.hollaback_url('');
        logger_stub = sinon.stub(Loudmouth, 'logger');
        Loudmouth.hollaback({
          fake: 'error'
        });
        assert(logger_stub.called);
        return Loudmouth.logger.restore();
      });
    });
    describe('#watch', function() {
      it('should return Loudmouth (for chaining)', function() {
        var w;
        w = Loudmouth.watch();
        return assert(w === Loudmouth);
      });
      return describe('changes window.onerror so it', function() {
        var addError_stub, complain_stub, onerror_stub;
        onerror_stub = null;
        addError_stub = null;
        complain_stub = null;
        before(function() {
          addError_stub = sinon.stub(Loudmouth, 'addError');
          complain_stub = sinon.stub(Loudmouth, 'complainLoudly');
          onerror_stub = sinon.stub(window, 'onerror').returns(true);
          Loudmouth.watch();
          return window.onerror('error message', 'url', 123);
        });
        after(function() {
          Loudmouth.addError.restore();
          complain_stub.restore();
          return onerror_stub.restore();
        });
        it('calls the original onError', function() {
          return assert(onerror_stub.called);
        });
        it('adds the error', function() {
          return assert(addError_stub.called);
        });
        return it('complains loudly', function() {
          return assert(complain_stub.called);
        });
      });
    });
    describe('#lurk', function() {
      it('should return Loudmouth (for chaining)', function() {
        var w;
        w = Loudmouth.lurk();
        return assert(w === Loudmouth);
      });
      it('should complain if the hollaback URL isn\'t set', function() {
        var logger_spy, w;
        logger_spy = sinon.spy(Loudmouth, 'logger');
        w = Loudmouth.lurk(null, null, logger_spy);
        assert(logger_spy.called);
        return Loudmouth.logger.restore();
      });
      return describe('changes window.onerror so it', function() {
        var addError_stub, complain_stub, logger_stub, onerror_stub;
        onerror_stub = null;
        addError_stub = null;
        complain_stub = null;
        logger_stub = null;
        before(function() {
          addError_stub = sinon.stub(Loudmouth, 'addError');
          complain_stub = sinon.stub(Loudmouth, 'complainSilently');
          logger_stub = sinon.stub(Loudmouth, 'logger');
          onerror_stub = sinon.stub(window, 'onerror').returns(true);
          Loudmouth.lurk();
          return window.onerror('error message', 'url', 123);
        });
        after(function() {
          Loudmouth.addError.restore();
          Loudmouth.complainSilently.restore();
          return Loudmouth.logger.restore();
        });
        it('calls the original onError', function() {
          return assert(onerror_stub.called);
        });
        it('adds the error', function() {
          return assert(addError_stub.called);
        });
        return it('complains loudly', function() {
          return assert(complain_stub.called);
        });
      });
    });
    return describe('#goAway', function() {
      return it('should restore the original onError');
    });
  });

}).call(this);
