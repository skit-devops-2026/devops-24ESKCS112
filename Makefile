# # Every team fills in the commands for their own stack.
# # The CI pipeline calls these targets, so the names must not change.
# #
# # Examples:
# #   Node    install: npm ci          test: npm test        build: npm run build
# #   Python  install: pip install -r requirements.txt
# #                                    test: pytest          build: echo "no build step"
# #   Java    install: ./mvnw -B dependency:go-offline
# #                                    test: ./mvnw test     build: ./mvnw package

# .PHONY: install test build run docker-build docker-up

# install:
# 	@echo "TODO: install dependencies" && exit 1

# test:
# 	@echo "TODO: run the test suite" && exit 1

# build:
# 	@echo "TODO: build the project" && exit 1

# run:
# 	@echo "TODO: start the app locally" && exit 1

# # Needed from M4 onwards
# docker-build:
# 	@echo "TODO: docker build for frontend and backend" && exit 1

# docker-up:
# 	docker compose up --build



.PHONY: install test build run

install:
	@echo No dependencies required for TravelX frontend

test:
	@echo Checking TravelX frontend files...
	python -c "import os,sys; folders=['html','css','js']; missing=[f for f in folders if not os.path.isdir(f)]; print('Missing:', ', '.join(missing)) if missing else print('All frontend folders OK'); sys.exit(1 if missing else 0)"
	@echo Frontend tests passed

build:
	@echo Building TravelX frontend...
	@echo No build step required for HTML/CSS/JavaScript

run:
	@echo Starting TravelX frontend...
	python -m http.server 8000 --directory html