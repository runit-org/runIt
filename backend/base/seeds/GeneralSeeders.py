# Import all seeders here

from base.seeds import UserSeeder
from base.seeds import UserVoteSeeder
from base.seeds import EventSeeder
from base.seeds import EventMemberSeeder
from base.seeds import EventCommentSeeder
from base.seeds import EventCommentLikeSeeder

def seed():
    seed_scenario_1()

def seed_scenario_1():
    UserSeeder.create_seed_data()
    UserVoteSeeder.create_seed_data()